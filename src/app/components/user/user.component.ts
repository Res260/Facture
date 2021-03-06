import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../_models/user';

@Component({
               selector:    'app-user',
               templateUrl: './user.component.html',
               styleUrls:   ['./user.component.css']
           })
export class UserComponent implements OnInit {

    @Input()
    public user: User;

    @Input()
    public displayName: boolean = true;

    constructor() {
    }

    public ngOnInit(): void {
    }

}
