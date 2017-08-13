import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DropdownElement} from '../../_models/dropdown-element';
import {User} from '../../_models/user';

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

    public selectedUser: User;

    protected dropdownUsers: Array<DropdownElement<User>>;

    constructor() {
    }

    /**
     * Fetches all users asynchronously.
     */
    public ngOnInit(): void {
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['users'] && changes['users'].currentValue) {
            this.dropdownUsers = changes['users'].currentValue.map(user => new DropdownElement(user.name, user));
            this.selectedUser  = this.dropdownUsers[0].value;
        }
    }

}
