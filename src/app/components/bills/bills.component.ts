import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Bill} from '../../_models/bill';
import {User} from '../../_models/user';

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
    }

}
