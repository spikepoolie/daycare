import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
    dayCareOptions = [
        {
            "optionType" : "New Child|newchild"
        },
        {
            "optionType": "Kids|kids"
        }, 
        {
            "optionType" : "Food / Nap / Diaper|foodnapdiaper"
        },
        {
            "optionType" : "Send Email|email"
        }];
    constructor() { }

    ngOnInit() {
    }

}
