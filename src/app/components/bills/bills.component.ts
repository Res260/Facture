import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Bill} from '../../_models/bill';
import {BillPart} from '../../_models/bill-part';
import {User} from '../../_models/user';
import {BillService} from '../../_services/bill.service';

/**
 * Component showing a list of bills and a form to add a bill.
 */
@Component({
               selector:    'app-bills',
               templateUrl: './bills.component.html',
               styleUrls:   ['./bills.component.css']
           })
export class BillsComponent implements OnInit {

    /**
     * The list of bills to display.
     */
    @Input()
    public bills: Array<Bill>;

    /**
     * The list of users that we can separate a bill with.
     */
    @Input()
    public users: Array<User>;

    /**
     * Emitted when a bill must be created.
     */
    @Output()
    public onAddNewBill: EventEmitter<{ bill: Bill, users: Array<User> }> = new EventEmitter();

    /**
     * Emitted when a bill has been deleted.
     */
    @Output()
    public onDeleteBill: EventEmitter<void> = new EventEmitter<void>();

    /**
     * A new bill that the user can populate its information.
     */
    public newBill: Bill = new Bill();

    /**
     * The user that need to pay the newBill.
     */
    public newBillPartUsers: Array<User> = [];

    constructor(private billService: BillService) {
    }

    public ngOnInit(): void {
    }

    /**
     * Emits an event to create a new bill. Then, reset the newBill and newBillPartUsers variables.
     */
    public addNewBill(): void {
        this.onAddNewBill.emit({bill: this.newBill, users: this.newBillPartUsers});
        this.newBill          = new Bill();
        this.newBillPartUsers = [];
    }

    /**
     * Asks the server to delete a bill. Once done, remove it from the list of bills.
     * @param {Bill} bill The bill to remove.
     */
    public deleteBill(bill: Bill): void {
        this.billService.deleteBill(bill.id).subscribe(() => {
            const billIndex: number = this.bills.indexOf(bill);
            this.bills.splice(billIndex, 1);
            this.onDeleteBill.emit();
        });
    }

    /**
     * @param {BillPart} billPart1 First billPart to compare
     * @param {BillPart} billPart2 Second billPart to compare
     * @returns {number} -1 if billPart1 has a lower id than billPart2, else 1.
     */
    public billPartSortCondition(billPart1: BillPart, billPart2: BillPart): number {
        return billPart1.user.id < billPart2.user.id ? -1 : 1;
    }

}
