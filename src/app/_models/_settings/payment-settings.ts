import {PaymentComponent} from '../../components/payment/payment.component';
import {Settings} from './settings';

/**
 * Model for payment settings stored in local storage.
 */
export class PaymentSettings extends Settings {
    public key: string = 'payment';
    public paymentTypesToDisplay: Array<string>;

    constructor() {
        super();
        this.paymentTypesToDisplay = [PaymentComponent.PAID, PaymentComponent.UNPAID];
    }
}
