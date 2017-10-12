import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaymentSettings} from '../../_models/_settings/payment-settings';
import {Bill} from '../../_models/bill';
import {BillBook} from '../../_models/bill-book';
import {Payment} from '../../_models/payment';
import {LocalStorageService} from '../../_services/local-storage.service';
import {PaymentService} from '../../_services/payment.service';

@Component({
               selector:    'app-payment',
               templateUrl: './payment.component.html',
               styleUrls:   ['./payment.component.css']
           })
export class PaymentComponent implements OnInit {
    public static PAID: string   = 'paid';
    public static UNPAID: string = 'unpaid';

    @Input()
    public bills: Array<Bill>;

    @Input()
    public payments: Array<Payment>;

    @Input()
    public selectedBillBook: BillBook;

    public readonly PAID: string   = PaymentComponent.PAID;
    public readonly UNPAID: string = PaymentComponent.UNPAID;

    /**
     * Emitted when a payment has been added.
     */
    @Output()
    public paymentAdded: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Emitted when a payment has been deleted.
     */
    @Output()
    public paymentDeleted: EventEmitter<void> = new EventEmitter<void>();

    public paymentSettings: PaymentSettings;

    constructor(private paymentService: PaymentService,
                private localStorageService: LocalStorageService) {
    }

    /**
     * Initializes the settings for the component.
     */
    public ngOnInit(): void {
        this.paymentSettings = this.localStorageService.get<PaymentSettings>(PaymentSettings);
    }

    /**
     * Saves the payment settings in local storage.
     */
    public savePayments(): void {
        this.localStorageService.set(this.paymentSettings);
    }

    /**
     * @returns {Array<Payment>} The array of payments to display depending on the selected boxes of the filters.
     */
    public getPaymentsToDisplay(): Array<Payment> {
        let paymentsToDisplay: Array<Payment> = [];
        if (this.paymentSettings.paymentTypesToDisplay.length === 2) {
            paymentsToDisplay = this.payments.reverse();
        } else {
            if (this.paymentSettings.paymentTypesToDisplay.includes(PaymentComponent.PAID)) {
                paymentsToDisplay = this.payments.filter(payment => !payment.isNotPaid).reverse();
            }
            if (this.paymentSettings.paymentTypesToDisplay.includes(PaymentComponent.UNPAID)) {
                paymentsToDisplay = this.payments.filter(payment => payment.isNotPaid).reverse();
            }
        }
        return paymentsToDisplay;
    }

    /**
     * Saves a new payment if it has not been paid. Else delete it. Then, add it to the list of payment.
     * @param {Payment} payment The payment to persist.
     */
    public addNewPaymentOrDeleteExistingPayment(payment: Payment): void {
        if (payment.isNotPaid) {
            this.addNewPayment(payment);
        } else {
            this.deletePayment(payment);
        }
    }

    /**
     * Saves a new payment in the server. Then, add it to the list of payment.
     * @param {Payment} newPayment The payment to persist.
     */
    private addNewPayment(newPayment: Payment): void {
        newPayment.billBookId = this.selectedBillBook.id;
        this.paymentService.createPayment(newPayment).subscribe(payment => {
            this.payments.push(payment);
            this.paymentAdded.emit();
        });
    }

    /**
     * Deletes a new payment from the server. Then, remove it from the list of payments.
     * @param {Payment} payment The payment to delete.
     */
    private deletePayment(payment: Payment): void {
        this.paymentService.deletePayment(payment.id).subscribe(() => {
            const paymentIndex: number = this.payments.indexOf(payment);
            this.payments.splice(paymentIndex, 1);
            this.paymentDeleted.emit();
        });
    }

}
