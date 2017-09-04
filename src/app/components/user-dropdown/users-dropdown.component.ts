import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UsersDropdownSettings} from '../../_models/_settings/users-dropdown-settings';
import {DropdownElement} from '../../_models/dropdown-element';
import {User} from '../../_models/user';
import {LocalStorageService} from '../../_services/local-storage.service';
import {UserService} from '../../_services/user.service';

/**
 * Component to choose from a list of users.
 */
@Component({
               selector:    'app-user-dropdown',
               templateUrl: './users-dropdown.component.html',
               styleUrls:   ['./users-dropdown.component.css']
           })
export class UsersDropdownComponent implements OnInit, OnChanges {

    @Input()
    public users: Array<User>;

    public usersDropdownSettings: UsersDropdownSettings;

    protected dropdownUsers: Array<DropdownElement<User>>;
    protected displayAddUserForm: boolean = false;

    constructor(private localStorageService: LocalStorageService,
                private userService: UserService) {
    }

    /**
     * Sets the selected user.
     */
    public ngOnInit(): void {
        this.usersDropdownSettings = this.localStorageService.get(UsersDropdownSettings);
    }

    /**
     * Updates the list of users when it changes.
     * @param {SimpleChanges} changes The @Input() changes.
     */
    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['users'] && changes['users'].currentValue) {
            this.setUserDropdownList(changes['users'].currentValue);
            if (!this.usersDropdownSettings.selectedUser) {
                this.usersDropdownSettings.selectedUser = this.dropdownUsers[0].value;
            }
        }
    }

    /**
     * Saves a user, then add it to the list of users and make it the selected one.
     * @param {User} userToAdd The billBook that's gonna be persisted.
     */
    protected addNewUser(userToAdd: User): void {
        this.userService.createUser(userToAdd).subscribe(newestUser => {
            this.users.push(newestUser);
            this.usersDropdownSettings.selectedUser = newestUser;
            this.setUserDropdownList(this.users);
        });
    }

    /**
     * Displays or hides the "add user" form
     */
    protected toggleAddUserButton(): void {
        this.displayAddUserForm = !this.displayAddUserForm;
    }

    /**
     * Saves the selected user.
     */
    protected saveSettings(): void {
        this.localStorageService.set(this.usersDropdownSettings);
    }

    /**
     * Sets the list of users to display in a dropdown.
     * @param {Array<User>} users The list of users to create the dropdown list from
     */
    private setUserDropdownList(users: Array<User>): void {
        this.dropdownUsers = users.map(user => new DropdownElement(user.name, user));
    }

}
