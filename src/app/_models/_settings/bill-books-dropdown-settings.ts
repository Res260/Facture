import {BillBook} from '../bill-book';
import {Settings} from './settings';

/**
 * Model for the current bill book settings stored in local storage.
 */
export class BillBooksDropdownSettings extends Settings {
    public key: string = 'billBooksDropdown';
    public selectedBillBook: BillBook;

    constructor() {
        super();
        this.selectedBillBook = null;
    }
}
