import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {BillBook} from '../../_models/bill-book';
import {DropdownElement} from '../../_models/dropdown-element';

/**
 * Component to choose a billBook to work with.
 */
@Component({
               selector:    'app-bill-book-dropdown',
               templateUrl: './bill-book-dropdown.component.html',
               styleUrls:   ['./bill-book-dropdown.component.css']
           })
export class BillBookDropdownComponent implements OnInit, OnChanges {

    @Input()
    public billBooks: Array<BillBook>;

    @Output()
    protected changeBillBook: EventEmitter<BillBook> = new EventEmitter();

    protected selectedBillBook: BillBook;

    protected dropdownBillBooks: Array<DropdownElement<BillBook>>;

    constructor() {
    }

    public ngOnInit(): void {
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['billBooks'] && changes['billBooks'].currentValue &&
            changes['billBooks'].currentValue.length > 0) {

            this.dropdownBillBooks = changes['billBooks'].currentValue
                                                         .map(billBook => new DropdownElement(billBook.name, billBook));
            this.selectedBillBook  = this.dropdownBillBooks[0].value;
        }
    }

}
