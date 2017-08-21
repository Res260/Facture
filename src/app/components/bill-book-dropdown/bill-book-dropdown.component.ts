import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {BillBooksDropdownSettings} from '../../_models/_settings/bill-books-dropdown-settings';
import {BillBook} from '../../_models/bill-book';
import {DropdownElement} from '../../_models/dropdown-element';
import {LocalStorageService} from '../../_services/local-storage.service';

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
    public changeBillBook: EventEmitter<BillBook> = new EventEmitter();

    public billBooksDropdownSettings: BillBooksDropdownSettings;

    protected dropdownBillBooks: Array<DropdownElement<BillBook>>;

    constructor(private localStorageService: LocalStorageService) {
    }

    /**
     * Sets the selected bill book.
     */
    public ngOnInit(): void {
        this.billBooksDropdownSettings = this.localStorageService.get(BillBooksDropdownSettings);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['billBooks'] && changes['billBooks'].currentValue &&
            changes['billBooks'].currentValue.length > 0) {

            this.dropdownBillBooks = changes['billBooks'].currentValue
                                                         .map(billBook => new DropdownElement(billBook.name, billBook));
            if (this.billBooksDropdownSettings.selectedBillBook) {
                this.billBooksDropdownSettings.selectedBillBook = this.dropdownBillBooks.find(
                    billBook => billBook.value.id === this.billBooksDropdownSettings.selectedBillBook.id
                ).value;
                this.changeBillBook.emit(this.billBooksDropdownSettings.selectedBillBook);
            }
        }
    }

    /**
     * Emits the changeBillBook event with the new bill book and saves the selected bill book locally.
     */
    protected onChangeBillBook(event: any): void {
        this.changeBillBook.emit(event.value);
        this.localStorageService.set(this.billBooksDropdownSettings);
    }

}
