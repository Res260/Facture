import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from '../../_models/user';

/**
 * Component with a form to add a new user.
 */
@Component({
               selector:    'app-add-user',
               templateUrl: './add-user.component.html',
               styleUrls:   ['./add-user.component.css']
           })
export class AddUserComponent implements OnInit {

    /**
     * Emitted when a user must be created.
     */
    @Output()
    public onAddNewBill: EventEmitter<User> = new EventEmitter();

    public userToAdd: User = new User();

    constructor() {
    }

    public ngOnInit(): void {
    }

    /**
     * Gets the profile pic url, emits the event with the bill book to add and resets the form.
     */
    public addBillBook(): void {
        this.userToAdd.profilePicUrl = `https://graph.facebook.com/v2.10/${this.userToAdd.profilePicUrl}` +
                                       '/picture?type=square&width=200';
        this.onAddNewBill.emit(this.userToAdd);
        this.userToAdd = new User();
    }

}
