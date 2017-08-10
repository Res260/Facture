import {Component, OnInit, ViewChild} from '@angular/core';
import {BillService} from './_services/bill.service';
import {Bill} from './_models/bill';
import {UsersDropdownComponent} from './components/user-dropdown/users-dropdown.component';
import {UserService} from './_services/user.service';
import {User} from './_models/user';
import {BillManager} from './_managers/bill.manager';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	@ViewChild('usersDropdown')
	protected usersDropdownComponent: UsersDropdownComponent;

	protected bills: Array<Bill> = [];
	protected newBill: Bill = new Bill();
	protected newBillPartUsers: Array<User>;
	protected users: Array<User>;

	constructor(private billService: BillService,
				private userService: UserService,
				private billManager: BillManager) {
	}

	public ngOnInit(): void {
		this.billService.getAll().subscribe(bills => this.bills = bills);
		this.userService.getAll().subscribe(users => {
			this.users = users;
		});
	}

	/**
	 * Requests the server to save a new {@link Bill} created by the selected user.
	 */
	protected addNewBill(): void {
		this.billManager.addBillPartsToBillFromUserList(this.newBillPartUsers, this.newBill);
		this.billManager.splitBillEvenly(this.newBill);
		this.newBill.user = this.usersDropdownComponent.selectedUser;
		this.billService.createBill(this.newBill).subscribe(
			bill => {
				this.bills.push(bill);
				this.newBill = new Bill();
				this.newBillPartUsers = [];
			}
		);

	}
}
