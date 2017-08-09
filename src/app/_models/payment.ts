import {User} from './user';

/**
 * Model representing a payment from one user to another.
 */
export class Payment {
	public userFrom: User;
	public userTo: User;
	public amount: number;
}
