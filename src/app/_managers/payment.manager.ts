import {Injectable} from '@angular/core';
import {Bill} from '../_models/bill';
import {BillPart} from '../_models/bill-part';
import {Payment} from '../_models/payment';
import {User} from '../_models/user';
import {UserManager} from './user.manager';

/**
 * Manager for payment-specific business logic.
 */
@Injectable()
export class PaymentManager {

    constructor(private userManager: UserManager) {
    }

    /**
     * Recalculate the payments to do and return the result with the already paid payments. The unpaid payments are at
     * the end of the list.
     * @param {Array<Payment>} payments The list of payments to update.
     * @param bills The list of bills needed to update the payments.
     * @param users The list of users needed to transform user ids to actual {@link User}.
     * @returns {Array<Payment>} The updated payment list with payments to do and already paid payments.
     */
    public updatePayments(payments: Array<Payment>, bills: Array<Bill>, users: Array<User>): Array<Payment> {
        const paymentsToDo: Array<Payment> =
                  this.getPaymentsToDo(bills, this.getAlreadyPaidPayments(payments))
                      .map(payment => {
                          payment.uFrom = this.userManager.getUserFromId(payment.userFrom,
                                                                         users);
                          payment.uTo   = this.userManager.getUserFromId(payment.userTo,
                                                                         users);
                          return payment;
                      });

        return this.getAlreadyPaidPayments(payments)
                   .concat(paymentsToDo);
    }

    /**
     * From a list of {@link Bill}, return a list of {@link Payment} to make to achieve equal payment of all the bills.
     * @param {Array<Bill>} bills The list of bill to calculate payments from.
     * @param {Array<Payment>} alreadyPaidPayments The list of payments that have already been marked as paid (and
     *                                             persisted in database).
     * @returns {Array<Payment>} The list of payments to do.
     */
    public getPaymentsToDo(bills: Array<Bill>, alreadyPaidPayments: Array<Payment>): Array<Payment> {
        const paymentsToDo: Array<Payment> = [];
        if (bills.length > 0) {
            const balances: Map<number, number> = this.getBalances(bills, alreadyPaidPayments);
            if (this.hasOneDifferentThanZero(balances)) {
                this.addPayments(balances, paymentsToDo);
            }
        }
        return paymentsToDo;
    }

    /**
     * @param {Array<Payment>} payments The list of payments to filter.
     * @returns {Payment[]} The list of already paid payments (saved in DB).
     */
    private getAlreadyPaidPayments(payments: Array<Payment>): Array<Payment> {
        return payments.filter(payment => !payment.isNotPaid);
    }

    /**
     * @param {Map<number, number>} balances The list of balances.
     * @returns {boolean} True if one balance is not zero.
     */
    private hasOneDifferentThanZero(balances: Map<number, number>): boolean {
        let hasOneDifferentThanZero: boolean     = false;
        const iterator: IterableIterator<number> = balances.values();
        let balance: IteratorResult<number>      = iterator.next();
        while (!hasOneDifferentThanZero && !balance.done) {
            if (balance.value !== 0) {
                hasOneDifferentThanZero = true;
            }
            balance = iterator.next();
        }
        return hasOneDifferentThanZero;
    }

    /**
     * From a list of {@link Bill}, calculates how much money each user should pay (negative balance) or get
     * paid (positive balance) to achieve equal payment.
     * @param {Array<Bill>} bills The list of bills
     * @param {Array<Payment>} alreadyPaidPayments The list of payments that have already been marked as paid (and
     *                                             persisted in database).
     * @returns {Map<number, number>} A map with a user id as key and balance (positive or negative) as value.
     */
    private getBalances(bills: Array<Bill>, alreadyPaidPayments: Array<Payment>): Map<number, number> {
        const totalPaidByUser: Map<number, number>       = this.getTotalPaidByUser(bills);
        const separatedTotalsByUser: Map<number, number> = this.getSeparatedTotals(bills);
        return this.calculateBalances(totalPaidByUser, separatedTotalsByUser, alreadyPaidPayments);
    }

    /**
     * Recursive function that pushes to the provided payment list for each
     * @param {Map<number, number>} balances The list of balances (positive and negative).
     * @param {Array<Payment>} paymentsToDo The list of payments to do
     */
    private addPayments(balances: Map<number, number>, paymentsToDo: Array<Payment>): void {
        const userWithBiggestBalance: number             = this.getUserWithBiggestBalance(balances);
        const isBiggestBalancePositive: boolean          = balances.get(userWithBiggestBalance) >= 0;
        const balancesOppositeSign: Map<number, number>  = this.getBalancesOfOneSign(balances,
                                                                                     !isBiggestBalancePositive);
        const userWithBiggestBalanceOppositeSign: number = this.getUserWithBiggestBalance(balancesOppositeSign);
        if (isBiggestBalancePositive) {
            this.addSinglePayment(userWithBiggestBalanceOppositeSign, userWithBiggestBalance, balances, paymentsToDo);
        } else {
            this.addSinglePayment(userWithBiggestBalance, userWithBiggestBalanceOppositeSign, balances, paymentsToDo);
        }
        this.removeClearedBalances(balances);
        this.addPaymentsIfNeeded(balances, paymentsToDo);
    }

    /**
     * If balances is not empty, add payments to the provided list.
     * @param {Map<number, number>} balances The balances of the users.
     * @param {Array<Payment>} payments The list of payments.
     */
    private addPaymentsIfNeeded(balances: Map<number, number>, payments: Array<Payment>): void {
        if (balances.size > 0) {
            this.addPayments(balances, payments);
        }
    }

    /**
     * Adds a {@link Payment} to the list of payments. Then, adjust the userToId's balance and sets
     * userFromId's balance to 0.
     * Ex: If userFromId has a balance of -40$ and userToId has a balance of +70$, the resulting balance for userFromId
     * will be 0 and for userToId, +30$.
     * Note: deals with float numbers precision errors.
     * @param {User} userFromId The user to give the payment's id (has a negative balance).
     * @param {User} userToId The user to receive the payment's id (has a positive balance).
     * @param {Map<number, number>} balances The list of balances.
     * @param {Array<Payment>} payments The list of payments (an element will be added).
     */
    private addSinglePayment(userFromId: number, userToId: number,
                             balances: Map<number, number>, payments: Array<Payment>): void {
        const userFromBalance: number = balances.get(userFromId);
        const userToBalance: number   = balances.get(userToId);
        payments.push(new Payment(userFromId, userToId, -userFromBalance));
        balances.set(userToId, this.getNewBalanceUserTo(userToBalance, userFromBalance));
        balances.set(userFromId, 0);
    }

    /**
     * Calculates the new balance for a payment's userTo and deals with float numbers precision errors.
     * @param {number} userToBalance Balance of the payment's userTo (positive).
     * @param {number} userFromBalance Balance of the payment's userFrom (negative).
     * @returns {number} Either the sum of both arguments or 0 if the sum is too close to 0.
     */
    private getNewBalanceUserTo(userToBalance: number, userFromBalance: number): number {
        let newBalanceUserTo: number = userToBalance + userFromBalance;
        if (Math.abs(newBalanceUserTo) - 0.001 < 0) {
            newBalanceUserTo = 0;
        }
        return newBalanceUserTo;
    }

    /**
     * Removes the balance that are to 0$.
     * @param {Map<number, number>} balances The balances to iterate on.
     */
    private removeClearedBalances(balances: Map<number, number>): void {
        const balancesToRemove: Array<number> = [];
        balances.forEach((balance, userId) => {
            if (balance === 0) {
                balancesToRemove.push(userId);
            }
        });
        balancesToRemove.forEach(userId => balances.delete(userId));
    }

    /**
     * From a list of balances, filter and return only the balances that are positive if getPositiveBalances == true or
     * balances that are negative if getPositiveBalances == false.
     * @param {Map<number, number>} balances The list of all balances (positive and negative).
     * @param {boolean} getPositiveBalances True to keep only positive balances (including 0),
     *                                      false to keep negative balances.
     * @returns {Map<number, number>} The filtered map with a user id as key and the balance as value.
     */
    private getBalancesOfOneSign(balances: Map<number, number>, getPositiveBalances: boolean): Map<number, number> {
        const balancesOfOneSign: Map<number, number> = new Map();
        balances.forEach((balance, userId) => {
            if (getPositiveBalances ? balance >= 0 : balance < 0) {
                balancesOfOneSign.set(userId, balance);
            }
        });
        return balancesOfOneSign;
    }

    /**
     * From a list of balances, return the user with the biggest balance (either positive or negative).
     * @param {Map<number, number>} balances The balances to look into.
     * @returns {number} The user with the biggest balance's id.
     */
    private getUserWithBiggestBalance(balances: Map<number, number>): number {
        let userWithBiggestBalance: number = null;
        balances.forEach((balance, userId) => {
            if (Math.abs(balance) > (balances.get(userWithBiggestBalance) || 0)) {
                userWithBiggestBalance = userId;
            }
        });
        return userWithBiggestBalance;
    }

    /**
     * From the money paid by everyone and the money everyone should have paid, return how much
     * everyone have paid too much or too little.
     * Ex: Emilio paid 300$ worth of bills but the part he should've paid is 100$, he has a balance of +200$.
     * @param {Map<number, number>} totalPaidByUser The total paid by every user.
     * @param {Map<number, number>} separatedTotalsByUser The amount everyone should have paid.
     * @param {Array<Payment>} alreadyPaidPayments The list of payments that have already been marked as paid (and
     *                                             persisted in database).
     * @returns {Map<number, number>} A map with a user id as key and a balance as value (some positive, some negative).
     */
    private calculateBalances(totalPaidByUser: Map<number, number>,
                              separatedTotalsByUser: Map<number, number>,
                              alreadyPaidPayments: Array<Payment>): Map<number, number> {
        const balances: Map<number, number> = new Map();
        separatedTotalsByUser.forEach((separatedTotal, userId) => {
            if (totalPaidByUser.has(userId)) {
                balances.set(userId, totalPaidByUser.get(userId) - separatedTotal);
            } else {
                balances.set(userId, -separatedTotal);
            }
        });
        alreadyPaidPayments.forEach(payment => {
            balances.set(payment.userFrom, balances.get(payment.userFrom) + payment.amount);
            balances.set(payment.userTo, balances.get(payment.userTo) - payment.amount);
        });
        return balances;
    }

    /**
     * From a list of bills, return the amount everyone should have paid (say, I pay a bill of
     * 100$ for me and a friend, we should both pay 50$).
     * @param {Array<Bill>} bills The bills to calculate from
     * @returns {Map<number, number>} A Map with a user id as key and a number (positive) as value.
     */
    private getSeparatedTotals(bills: Array<Bill>): Map<number, number> {
        const separatedTotals: Map<number, number> = new Map();
        bills.forEach(bill => {
            bill.parts.forEach(billPart => {
                if (!separatedTotals.has(billPart.user.id)) {
                    separatedTotals.set(billPart.user.id, this.getPriceFromBillPart(bill, billPart));
                } else {
                    separatedTotals.set(billPart.user.id,
                        separatedTotals.get(billPart.user.id) + this.getPriceFromBillPart(bill, billPart));
                }
            });
        });
        return separatedTotals;
    }

    /**
     * @param bill {Bill} The bill in question
     * @param billPart {BillPart} The billPart in question
     * @returns {number} The price the billPart represents for the provided bill. (Ex: 20% of  300$ => 60$)
     */
    private getPriceFromBillPart(bill: Bill, billPart: BillPart): number {
        return bill.totalPrice * billPart.percentage;
    }

    /**
     * From a list of bills, return how much everyone has paid as a map<user, totalPaid>.
     * @param {Array<Bill>} bills The bills to make the total from.
     * @returns {Map<number, number>} how much everyone has paid ex: {User[Emilio].id: 531.00$, User[Alex].id: 86.45$}.
     */
    private getTotalPaidByUser(bills: Array<Bill>): Map<number, number> {
        return bills.reduce((totalPaid, bill) => {
            const castedTotalPaid: Map<number, number> = (<Map<number, number>> totalPaid);
            if (!castedTotalPaid.has(bill.user.id)) {
                castedTotalPaid.set(bill.user.id, bill.totalPrice);
            } else {
                castedTotalPaid.set(bill.user.id, castedTotalPaid.get(bill.user.id) + bill.totalPrice);
            }
            return totalPaid;
        }, new Map());
    }
}
