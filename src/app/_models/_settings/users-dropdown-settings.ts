import {User} from '../user';
import {Settings} from './settings';

/**
 * Model for the current user settings stored in local storage.
 */
export class UsersDropdownSettings extends Settings {
    public key: string = 'usersDropdown';
    public selectedUser: User;

    constructor() {
        super();
        this.selectedUser = null;
    }
}
