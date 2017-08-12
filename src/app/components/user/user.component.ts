import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../_models/user';

@Component({
               selector:    'app-user',
               templateUrl: './user.component.html',
               styleUrls:   ['./user.component.css']
           })
export class UserComponent implements OnInit {

    @Input()
    protected user: User;

    constructor() {
    }

    public ngOnInit(): void {
    }

}
