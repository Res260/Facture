import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Bill} from '../../_models/bill';
import {Payment} from '../../_models/payment';
import {PaymentService} from '../../_services/payment.service';

@Component({
               selector:    'app-payment',
               templateUrl: './payment.component.html',
               styleUrls:   ['./payment.component.css']
           })
export class PaymentComponent implements OnInit, OnChanges {

    @Input()
    protected bills: Array<Bill>;
    @Input()
    protected payments: Array<Payment>;

    /**
     * Emitted when a payment has been added.
     */
    @Output()
    protected paymentAdded: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Emitted when a payment has been deleted.
     */
    @Output()
    protected paymentDeleted: EventEmitter<void> = new EventEmitter<void>();

    constructor(private paymentService: PaymentService) {
    }

    public ngOnInit(): void {
    }

    public ngOnChanges(changes: SimpleChanges): void {
    }

    /**
     * Saves a new payment if it has not been paid. Else delete it. Then, add it to the list of payment.
     * @param {Payment} payment The payment to persist.
     */
    protected addNewPaymentOrDeleteExistingPayment(payment: Payment): void {
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
