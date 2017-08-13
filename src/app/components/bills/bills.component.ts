import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Bill} from '../../_models/bill';
import {BillPart} from '../../_models/bill-part';
import {User} from '../../_models/user';

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
    protected bills: Array<Bill>;

    /**
     * The list of users that we can separate a bill with.
     */
    @Input()
    protected users: Array<User>;

    /**
     * A new bill that the user can populate its information.
     */
    protected newBill: Bill = new Bill();

    /**
     * The user that need to pay the newBill.
     */
    protected newBillPartUsers: Array<User> = [];

    /**
     * Emitted when a bill must be created.
     */
    @Output()
    protected onAddNewBill: EventEmitter<{ bill: Bill, users: Array<User> }> = new EventEmitter();

    constructor() {
    }

    public ngOnInit(): void {
    }

    protected addNewBill(): void {
        this.onAddNewBill.emit({bill: this.newBill, users: this.newBillPartUsers});
        this.newBill          = new Bill();
        this.newBillPartUsers = [];
    }

    /**
     * @param {BillPart} billPart1 First billPart to compare
     * @param {BillPart} billPart2 Second billPart to compare
     * @returns {number} -1 if billPart1 has a lower id than billPart2, else 1.
     */
    protected billPartSortCondition(billPart1: BillPart, billPart2: BillPart): number {
        return billPart1.user.id < billPart2.user.id ? -1 : 1;
    }

}
