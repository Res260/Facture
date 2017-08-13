/**
 * Model representing a payment from one user to another.
 */
import {User} from './user';

export class Payment {
    public id: number;
    public userFrom: number;
    public userTo: number;
    public uFrom: User;
    public uTo: User;
    public amount: number;
    public isNotPaid: boolean = true;

    constructor(userFrom: number, userTo: number, amount: number) {
        this.userFrom = userFrom;
        this.userTo   = userTo;
        this.amount   = amount;
        this.uFrom    = new User();
        this.uTo      = new User();
    }
}
