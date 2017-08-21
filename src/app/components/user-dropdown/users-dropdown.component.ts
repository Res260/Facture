import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UsersDropdownSettings} from '../../_models/_settings/users-dropdown-settings';
import {DropdownElement} from '../../_models/dropdown-element';
import {User} from '../../_models/user';
import {LocalStorageService} from '../../_services/local-storage.service';

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

    constructor(private localStorageService: LocalStorageService) {
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
            this.dropdownUsers = changes['users'].currentValue.map(
                user => new DropdownElement(user.name, user));
            if (!this.usersDropdownSettings.selectedUser) {
                this.usersDropdownSettings.selectedUser = this.dropdownUsers[0].value;
            }
        }
    }

    /**
     * Saves the selected user.
     */
    protected saveSettings(): void {
        this.localStorageService.set(this.usersDropdownSettings);
    }

}
