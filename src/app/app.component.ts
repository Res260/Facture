import {Component, OnInit, ViewChild} from '@angular/core';
import {BillManager} from './_managers/bill.manager';
import {PaymentManager} from './_managers/payment.manager';
import {Bill} from './_models/bill';
import {Payment} from './_models/payment';
import {User} from './_models/user';
import {BillService} from './_services/bill.service';
import {PaymentService} from './_services/payment.service';
import {UserService} from './_services/user.service';
import {UsersDropdownComponent} from './components/user-dropdown/users-dropdown.component';

@Component({
               selector:    'app-root',
               templateUrl: './app.component.html',
               styleUrls:   ['./app.component.css']
           })
export class AppComponent implements OnInit {

    @ViewChild('usersDropdown')
    protected usersDropdownComponent: UsersDropdownComponent;

    protected payments: Array<Payment> = [];
    protected bills: Array<Bill>       = [];
    protected users: Array<User>;

    constructor(private billService: BillService,
                private userService: UserService,
                private paymentService: PaymentService,
                private billManager: BillManager,
                private paymentManager: PaymentManager) {
    }

    /**
     * Fetches the bills, users and payments.
     */
    public ngOnInit(): void {
        this.userService.getAll().subscribe(users => this.users = users);
        this.paymentService.getAll().subscribe(payments => {
            this.billService.getAll().subscribe(bills => {
                this.bills    = bills;
                this.payments = this.paymentManager.updatePayments(this.payments, this.bills, this.users);
            });
            this.payments = this.payments.concat(payments).reverse();
        });
    }

    /**
     * Requests the server to save a new {@link Bill} created by the selected user. On success, updates the list of
     * payments.
     */
    protected addNewBill(billAndUsers: { bill: Bill, users: Array<User> }): void {
        this.billManager.addBillPartsToBillFromUserList(billAndUsers.users, billAndUsers.bill);
        this.billManager.splitBillEvenly(billAndUsers.bill);
        billAndUsers.bill.user = this.usersDropdownComponent.selectedUser;
        this.billService.createBill(billAndUsers.bill).subscribe(
            bill => {
                this.bills    = [...this.bills, bill];
                this.payments = this.paymentManager.updatePayments(this.payments, this.bills, this.users);
            }
        );
    }

    /**
     * Updates the list of payments.
     */
    protected onPaymentAdded(): void {
        this.payments = this.paymentManager.updatePayments(this.payments, this.bills, this.users);
    }
}
