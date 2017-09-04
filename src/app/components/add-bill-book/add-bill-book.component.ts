import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BillBook} from '../../_models/bill-book';

/**
 * Component with a form to add a new bill book.
 */
@Component({
               selector:    'app-add-bill-book',
               templateUrl: './add-bill-book.component.html',
               styleUrls:   ['./add-bill-book.component.css']
           })
export class AddBillBookComponent implements OnInit {

    /**
     * Emitted when a billBook must be created.
     */
    @Output()
    protected onAddNewBill: EventEmitter<BillBook> = new EventEmitter();

    protected billBookToAdd: BillBook = new BillBook();

    constructor() {
    }

    public ngOnInit(): void {
    }

    /**
     * Emits the event with the bill book to add and resets the form.
     */
    protected addBillBook(): void {
        this.onAddNewBill.emit(this.billBookToAdd);
        this.billBookToAdd = new BillBook();
    }

}
