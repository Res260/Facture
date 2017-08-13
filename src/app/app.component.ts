import {Component, OnInit, ViewChild} from '@angular/core';
import {BillManager} from './_managers/bill.manager';
import {PaymentManager} from './_managers/payment.manager';
import {Bill} from './_models/bill';
import {BillBook} from './_models/bill-book';
import {User} from './_models/user';
import {BillBookService} from './_services/bill-book.service';
import {BillService} from './_services/bill.service';
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

    protected billBooks: Array<BillBook> = [];
    protected selectedBillBook: BillBook = new BillBook();
    protected users: Array<User>;

    constructor(private billService: BillService,
                private billBookService: BillBookService,
                private userService: UserService,
                private billManager: BillManager,
                private paymentManager: PaymentManager) {
    }

    /**
     * Fetches the bills, users and payments.
     */
    public ngOnInit(): void {
        this.userService.getAll().subscribe(users => this.users = users);
        this.billBookService.getAll().subscribe(billBooks => {
            this.billBooks                 = billBooks;
            this.selectedBillBook          = billBooks[0];
            this.selectedBillBook.payments = this.paymentManager.updatePayments(this.selectedBillBook.payments,
                                                                                this.selectedBillBook.bills,
                                                                                this.users);
        });
    }

    /**
     * Requests the server to save a new {@link Bill} created by the selected user. On success, updates the list of
     * payments.
     */
    protected addNewBill(billAndUsers: { bill: Bill, users: Array<User> }): void {
        this.billManager.addBillPartsToBillFromUserList(billAndUsers.users, billAndUsers.bill);
        this.billManager.splitBillEvenly(billAndUsers.bill);
        billAndUsers.bill.user       = this.usersDropdownComponent.selectedUser;
        billAndUsers.bill.billBookId = this.selectedBillBook.id;
        this.billService.createBill(billAndUsers.bill).subscribe(
            bill => {
                this.selectedBillBook.bills    = [...this.selectedBillBook.bills, bill];
                this.selectedBillBook.payments = this.paymentManager.updatePayments(this.selectedBillBook.payments,
                                                                                    this.selectedBillBook.bills,
                                                                                    this.users);
            }
        );
    }

    /**
     * Update the selected billBook and recalculate the payments.
     */
    protected onChangeBillBook(newBillBook: BillBook): void {
        this.selectedBillBook = newBillBook;
        this.updatePaymentList();
    }

    /**
     * Updates the list of payments.
     */
    protected updatePaymentList(): void {
        this.selectedBillBook.payments = this.paymentManager.updatePayments(this.selectedBillBook.payments,
                                                                            this.selectedBillBook.bills, this.users);
    }
}
