import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PaymentManager} from '../../_managers/payment.manager';
import {Bill} from '../../_models/bill';
import {Payment} from '../../_models/payment';

@Component({
               selector: 'app-payment',
               templateUrl: './payment.component.html',
               styleUrls: ['./payment.component.css']
           })
export class PaymentComponent implements OnInit, OnChanges {

    @Input()
    protected payments: Array<Payment> = [];

    @Input()
    protected bills: Array<Bill>;

    constructor(private paymentManager: PaymentManager) {
    }

    public ngOnInit(): void {
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['bills']) {
            this.payments = this.paymentManager.getPaymentsToDo(this.bills);
        }
    }

}
