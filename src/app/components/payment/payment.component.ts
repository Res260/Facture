import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Bill} from '../../_models/bill';
import {Payment} from '../../_models/payment';
import {PaymentService} from '../../_services/payment.service';

@Component({
               selector: 'app-payment',
               templateUrl: './payment.component.html',
               styleUrls: ['./payment.component.css']
           })
export class PaymentComponent implements OnInit, OnChanges {

    @Output()
    public paymentAdded: EventEmitter<void> = new EventEmitter<void>();

    @Input()
    protected bills: Array<Bill>;
    @Input()
    protected payments: Array<Payment>;

    constructor(private paymentService: PaymentService) {
    }

    public ngOnInit(): void {
    }

    public ngOnChanges(changes: SimpleChanges): void {
    }

    /**
     * Saves a new payment in the server. Then, add it to the list of payment.
     * @param {Payment} newPayment The payment to persist.
     */
    protected addNewPayment(newPayment: Payment): void {
        this.paymentService.createPayment(newPayment).subscribe(payment => {
            this.payments.push(payment);
            this.paymentAdded.emit();
        });
    }

}
