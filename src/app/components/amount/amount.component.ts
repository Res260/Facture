import {Component, Input, OnInit} from '@angular/core';

/**
 * Displays a price.
 */
@Component({
               selector:    'app-amount',
               templateUrl: './amount.component.html',
               styleUrls:   ['./amount.component.css']
           })
export class AmountComponent implements OnInit {

    @Input()
    public amount: number;

    constructor() {
    }

    public ngOnInit(): void {
    }

}
