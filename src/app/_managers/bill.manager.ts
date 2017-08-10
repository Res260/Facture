import {Injectable} from '@angular/core';
import {Bill} from '../_models/bill';
import {User} from '../_models/user';
import {BillPart} from '../_models/bill-part';

/**
 * Manager for bill-specific business logic.
 */
@Injectable()
export class BillManager {

	constructor() {
	}

	/**
	 * From a list of users, creates {@link BillPart}s and put them in the provided bill.
	 * Note: {@link BillPart}s won't have a bill nor a percentage.
	 * @param {Array<User>} users The list of users to create {@link BillPart}s from.
	 * @param {Bill} bill The bill to add {@link BillPart}s to.
	 */
	public addBillPartsToBillFromUserList(users: Array<User>, bill: Bill): void {
		users.forEach(
			user =>
				bill.parts.push(new BillPart(user)));
	}

	/**
	 * Changes the {@link BillPart} in a {@link Bill} to make the percentage even accross all {@link BillPart}.
	 * So lets say a bill has 4 {@link BillPart}, each billParts will have a percentage of 1 / 4 = 25%.
	 * @param {Bill} bill The bill to split.
	 */
	public splitBillEvenly(bill: Bill): void {
		bill.parts.forEach(billPart => billPart.percentage = 1 / bill.parts.length);
	}

}
