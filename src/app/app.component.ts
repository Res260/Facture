import {Component, OnInit} from '@angular/core';
import {BillService} from './_services/bill.service';
import {Bill} from './_models/bill';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	protected bills: Array<Bill> = [];

	protected newBill: Bill = new Bill();

	constructor(private billService: BillService) {
	}

	public ngOnInit(): void {
		this.billService.getAll().subscribe(bills => this.bills = bills);
	}

	protected addNewBill(): void {
		this.bills.push(this.newBill);
		this.newBill = new Bill();
	}
}
