import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { trigger, state, transition, style, animate, group } from '@angular/animations';

@Component({
    selector: 'kids',
    templateUrl: './kids.component.html',
    styleUrls: ['./kids.component.css'],
    animations: [
        trigger('fadeInAnimation', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate(500)
            ]),
            transition('* => void', [
                animate(0, style({opacity:1}))
            ])
        ])
    ]
})
export class KidsComponent implements OnInit {
    data: Object;
    todayDate = new Date();
    myMonth:number;
    myMonthString:string;
    myDay:string = "";
    ismore:boolean = false;
    showmore:boolean = true;
    todayDateFormatted:string = "";
    private urlGetKids:string = "http://www.goemobile.com/mobile/daycare/php/get_kids.php";
    constructor(private http: Http) { }
    //allKids:Array[];

    showMoreLess(type:string){
        if(type == 'more'){
            this.ismore=true;
            this.showmore=false;
        }
        else{
            this.ismore=false;
            // setTimeout(()=>{ 
                this.showmore=true; 
            // },700);
            
        }

    }
    ngOnInit() {
        this.myMonth = (this.todayDate.getMonth() + 1);
        
        if(this.myMonth == 1 || this.myMonth == 2 || this.myMonth == 3 || this.myMonth == 4 || this.myMonth == 5 || this.myMonth == 6 || this.myMonth == 7 || this.myMonth == 8 || this.myMonth == 9){ 
            this.myMonthString = "0" + this.myMonth.toString();
        }

        this.myDay = this.todayDate.getDate().toString();
        if(this.myDay.length == 1){
            this.myDay = "0" + this.myDay;
        }
        
        this.todayDateFormatted = this.myMonth + "/" + this.myDay;
        this.http.get(this.urlGetKids)
        .subscribe(response => {
            this.data = response.json();
        });
  }

}
