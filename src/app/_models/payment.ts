/**
 * Model representing a payment from one user to another.
 */
export class Payment {
    public userFrom: number;
    public userTo: number;
    public amount: number;

    constructor(userFrom: number, userTo: number, amount: number) {
        this.userFrom = userFrom;
        this.userTo = userTo;
        this.amount = amount;
    }
}
