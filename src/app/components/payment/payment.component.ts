import {Component, Input, OnInit} from '@angular/core';
import {Payment} from '../../_models/payment';
import {PaymentService} from '../../_services/payment.service';

@Component({
	selector: 'app-payment',
	templateUrl: './payment.component.html',
	styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

	@Input()
	protected payments: Array<Payment> = [];

	constructor(private paymentService: PaymentService) {
	}

	public ngOnInit() {
		this.paymentService.getAll().subscribe(payments => this.payments = payments);
	}

}
