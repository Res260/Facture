import {Bill} from './bill';
import {Payment} from './payment';

/**
 * Model representing a Bill Book which regroup bills and payments of said bills.
 */
export class BillBook {
    public id: number;
    public name: string;
    public bills: Array<Bill>       = [];
    public payments: Array<Payment> = [];

    constructor() {
    }

}
