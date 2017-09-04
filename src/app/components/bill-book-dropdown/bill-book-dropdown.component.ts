import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {BillBooksDropdownSettings} from '../../_models/_settings/bill-books-dropdown-settings';
import {BillBook} from '../../_models/bill-book';
import {DropdownElement} from '../../_models/dropdown-element';
import {BillBookService} from '../../_services/bill-book.service';
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
    protected displayAddBillBook: boolean = false;

    constructor(private localStorageService: LocalStorageService,
                private billBookService: BillBookService) {
    }

    /**
     * Sets the selected bill book.
     */
    public ngOnInit(): void {
        this.billBooksDropdownSettings = this.localStorageService.get(BillBooksDropdownSettings);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (this.billBookListIsNotEmpty(changes['billBooks'])) {
            this.setBillBookDropdownList(changes['billBooks'].currentValue);
            if (changes['billBooks'].currentValue.length !== changes['billBooks'].previousValue.length + 1) {
                this.selectGoodBillBookAccordingToSettings();
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

    /**
     * Saves a billBook, then add it to the list of bill books and make it the selected one.
     * @param {BillBook} billBookToAdd The billBook that's gonna be persisted.
     */
    protected addNewBillBook(billBookToAdd: BillBook): void {
        this.billBookService.createBillBook(billBookToAdd).subscribe(newestBillBook => {
            this.billBooks.push(newestBillBook);
            this.billBooksDropdownSettings.selectedBillBook = newestBillBook;
            this.setBillBookDropdownList(this.billBooks);
            this.onChangeBillBook({value: newestBillBook});
        });
    }

    /**
     * Displays or hides the "add bill book" form
     */
    protected toggleAddBillBookButton(): void {
        this.displayAddBillBook = !this.displayAddBillBook;
    }

    /**
     * @param {SimpleChange} change The SimpleChange object containing the state of the billBookList before and after
     *                       the change.
     * @returns {boolean} True if its a list with more than 0 elements, else false.
     */
    private billBookListIsNotEmpty(change: SimpleChange): boolean {
        return change && change.currentValue &&
               change.currentValue.length > 0;
    }

    private setBillBookDropdownList(billBooks: Array<BillBook>): void {
        this.dropdownBillBooks = billBooks.map(billBook => new DropdownElement(billBook.name, billBook));
    }

    /**
     * Sets the selected bill book according to the one in the settings.
     */
    private selectGoodBillBookAccordingToSettings(): void {
        if (this.billBooksDropdownSettings.selectedBillBook) {
            this.billBooksDropdownSettings.selectedBillBook = this.dropdownBillBooks.find(
                billBook => billBook.value.id === this.billBooksDropdownSettings.selectedBillBook.id
            ).value;
            this.changeBillBook.emit(this.billBooksDropdownSettings.selectedBillBook);
        }
    }

}
