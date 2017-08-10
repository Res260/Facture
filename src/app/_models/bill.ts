import {User} from './user';
import {BillPart} from './bill-part';

/**
 * Model representing a Bill which is paid by a user with a total price and a title.
 */
export class Bill {
	public user: User;
	public totalPrice: number;
	public title: string;
	public description: string;
	public parts: Array<BillPart> = [];

}
