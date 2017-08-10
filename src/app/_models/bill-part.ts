import {User} from './user';
import {Bill} from './bill';

/**
 * Model representing a bill part (say, 20% of a bill that is divided among 5 people).
 */
export class BillPart {
	public bill: Bill;
	public user: User;
	public percentage: number;

	constructor(user: User, bill?: Bill) {
		this.user = user;
		this.bill = bill;
	}
}
