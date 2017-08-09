import {Component, OnInit} from '@angular/core';
import {User} from '../../_models/user';
import {UserService} from '../../_services/user.service';
import {DropdownElement} from '../../_models/dropdown-element';

/**
 * Component to choose from a list of users.
 */
@Component({
	selector: 'app-user-dropdown',
	templateUrl: './users-dropdown.component.html',
	styleUrls: ['./users-dropdown.component.css']
})
export class UsersDropdownComponent implements OnInit {

	public selectedUser: User;

	protected dropdownUsers: Array<DropdownElement<User>>;
	private users: Array<User> = [];


	constructor(private userService: UserService) {
	}

	/**
	 * Fetches all users asynchronously.
	 */
	public ngOnInit() {
		this.userService.getAll().subscribe(users => {
			this.users = users;
			this.dropdownUsers = this.users.map(user => new DropdownElement(user.name, user));
			this.selectedUser = this.dropdownUsers[0].value;
		});
	}

}
