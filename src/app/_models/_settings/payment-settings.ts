/**
 * Model for payment settings stored in local storage.
 */
import {Settings} from './settings';

export class PaymentSettings extends Settings {
    public key: string = 'payment';
    public paymentTypesToDisplay: Array<string>;

    constructor() {
        super();
        this.paymentTypesToDisplay = [];
    }
}
