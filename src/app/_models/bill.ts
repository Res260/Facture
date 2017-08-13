import {BillPart} from './bill-part';
import {User} from './user';

/**
 * Model representing a Bill which is paid by a user with a total price and a title.
 */
export class Bill {
    public id: number;
    public user: User;
    public totalPrice: number;
    public title: string;
    public parts: Array<BillPart> = [];

}
