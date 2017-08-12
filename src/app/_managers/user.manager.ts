import {Injectable} from '@angular/core';
import {NoEntityFoundWithIdException} from '../_exceptions/NoEntityFoundWithIdException';
import {User} from '../_models/user';

/**
 * Manager for user-specific business logic.
 */
@Injectable()
export class UserManager {

    constructor() {
    }

    /**
     * Throws {@link NoEntityFoundWithIdException} if we don't find the user in the list.
     * @param {number} id The id of the user we're looking for.
     * @param {Array<User>} users The list of users to look into.
     * @returns {User} The user with given id.
     */
    public getUserFromId(id: number, users: Array<User>): User {
        const foundUser: User = users.find(user => user.id === id);
        if (!foundUser) {
            throw new NoEntityFoundWithIdException(`The user with id ${id} was not` +
                                                   `found in the provided user list: ${users}`);
        }
        return foundUser;
    }
}
