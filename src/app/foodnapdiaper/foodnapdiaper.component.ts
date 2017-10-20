import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { trigger, state, transition, style, animate, group } from '@angular/animations';
import { Http } from '@angular/http';

@Component({
  selector: 'app-foodnapdiaper',
  templateUrl: './foodnapdiaper.component.html',
  styleUrls: ['./foodnapdiaper.component.css'],
  animations: [
    trigger('scaleForm', [
      transition(':enter', [
          style({ transform: 'scale(1.1)' }),
          animate(1000)
      ]),
      transition(':leave', [
        animate(0, style({transform: 'scale(1.0)'}))
      ])
    ])
  ]
})

export class FoodnapdiaperComponent implements OnInit {
  data:Object;
  private urlGetKids:string = "http://www.goemobile.com/mobile/daycare/php/get_kids.php";
  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get(this.urlGetKids)
    .subscribe(response => {
        this.data = response.json();
    });
  }

  GoToEntry(kidid){
    console.log(kidid);
  }

}
