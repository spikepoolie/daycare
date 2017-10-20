import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate, group } from '@angular/animations';
import { BrowserModule } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatDatepicker} from '@angular/material';


@Component({
  selector: 'app-newkidregistration',
  templateUrl: './newkidregistration.component.html',
  styleUrls: ['./newkidregistration.component.css'],
  animations: [
    trigger('fadeInAnimation', [
      transition(':enter', [
          style({ opacity: 0 }),
          animate(300)
      ]),
      transition('* => void', [
        animate(0, style({opacity:1}))
      ])
    ]),
    trigger('scaleForm', [
      transition(':enter', [
          style({ transform: 'scale(1.1)' }),
          animate(300)
      ]),
      transition(':leave', [
        animate(0, style({transform: 'scale(1.0)'}))
      ])
    ]),
    trigger('itemAnim', [
      transition(':enter', [
        style({transform: 'translateX(-90%)'}),
        animate(300)
      ]),
      transition(':leave', [
        group([
          animate(700, style({
            transform: 'translate(180%)'
          })),
          animate(300, style({
            opacity: 0
          }))
        ])
      ])
    ])
  ] 
})

export class NewkidregistrationComponent implements OnInit {
    kidname:boolean = true;
    kidbirthay:boolean = true;
    kidgender:boolean = true;
    fathername:boolean = true;
    fatheremail:boolean = true;
    fatherphone:boolean = true;
    mothername:boolean = true;
    motheremail:boolean = true;
    motherphone:boolean = true;
    isMotherDisabled:boolean = false;
    isFatherDisabled:boolean = false;
    registrationdone:boolean = false;
    motherfathernotapplicable:boolean = false;
    isFatherNa:boolean = false;
    isMotherNa:boolean = false;

    kid_mother_email:string = "";
    kid_mother_name:string = "";
    kid_mother_phone:string = "";
    kid_mother_company:string= "";
    kid_father_email:string = "";
    kid_father_name:string = "";
    kid_father_company:string = "";
    kid_father_phone:string = "";

    mothernotapplicable:any;
    fathernotapplicable:any;
    
    todayDate = new Date();
    kid_name:string;
    kidbday:string;
    monthBday:number;
    d = new Date();
    currentMonth = (this.todayDate.getMonth() + 1);
    bdayMaxYear:number = this.todayDate.getFullYear();
    bdayMinYear:number = (this.bdayMaxYear - 5);
    
    monthsBday:string[] = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    dayBdayFeb:any[] = [
        "01","02","03","04","05","06","07","08","09","10",
        "11","12","13","14","15","16","17","18","19","20",
        "21","22","23","25","25","26","27","28",
    ];
    dayBdayOthers:any[] = ["29", "30", "31"];
    dayBday:any[];
    yearsListBday:any[] = [2017,2016,2015,2014,2013,2012,2011];
 
    private myUrlPath = "http://www.goemobile.com/mobile/daycare/php/";
    private urlSaveRegistration:string = this.myUrlPath + "/kid_registration.php";   

    checkIfFebruary(myMonth){
        console.log(myMonth);
        if(myMonth != "February"){
            this.dayBday = [...this.dayBdayFeb, ...this.dayBdayOthers];
        }
        else{
            this.dayBday = this.dayBdayFeb;
        }
    }

    addNewKid(frm){
        console.log(frm);
        this.kidname = true;
        if(frm.kid_name == undefined){
            this.kidname = false;
        }
        else if(frm.kid_name.length == 0){
            this.kidname = false;
        }
        else{
            this.kidname = true;
        }
        if(frm.kid_father_name == undefined){
            this.fathername = false;
        }
        else if(frm.kid_father_name.length == 0){
            this.fathername = false;
        }
        else{
            this.fathername = true;
        }
        if(frm.kid_father_phone == undefined){
            this.fatherphone = false;
        }
        else if(frm.kid_father_phone.length == 0){
            this.fatherphone = false;
        }
        else{
            this.fatherphone = true;
        } 
        if(frm.kid_father_email == undefined){
            this.fatheremail = false;
        }
        else if(frm.kid_father_email.length == 0){
            this.fatheremail = false;
        }
        else{
            this.fatheremail = true;
        }                
        if(frm.kid_mother_name == undefined){
            this.mothername = false;
        }
        else if(frm.kid_mother_name.length == 0){
            this.mothername = false;
        }
        else{
            this.mothername = true;
        }
        if(frm.kid_mother_phone == undefined){
            this.motherphone = false;
        }
        else if(frm.kid_mother_phone.length == 0){
            this.motherphone = false;
        }
        else{
            this.motherphone = true;
        }
        if(frm.kid_mother_email == undefined){
            this.motheremail = false;
        }
        else if(frm.kid_mother_email.length == 0){
            this.motheremail = false;
        }
        else{
            this.motheremail = true;
        }                 
        this.kidbday = `${frm.yearsBday}-${frm.monthBday}-${frm.daysBday}`;
        this.http.post(this.urlSaveRegistration, JSON.stringify(frm))
        .subscribe(response => {
            // this.showSpinner = false;
            // this.isSubmitting = false;
            if(response.json().result == 'OK'){
            // this.isRecordInserted = true;
            // this.getKidEntries();
            // this.clearFormFields();
            // setTimeout(()=>{ 
            //     this.isRecordInserted = false;
            //     this.isUpdatingEntry = false;
            // },2000);
            }
            else{
            //this.isRecordInserted = false;
            alert('Something went wrong: ' + response.json().result);
            }
        }
        );
    }

    makeMotherNotApplicable(e){
        if(e.target.checked){
            this.fathernotapplicable = false;
            this.isFatherDisabled = false;
            this.mothernotapplicable = true;
            this.isMotherNa = true;
            this.kid_mother_name = "N/A";
            this.kid_mother_phone = "N/A";
            this.kid_mother_company = "N/A";
            this.kid_mother_email = "N/A";
            this.kid_mother_company = "N/A";
            this.isMotherDisabled = true;
            this.kid_father_name = "";
            this.kid_father_phone = "";
            this.kid_father_company = "";
            this.kid_father_email = "";
            this.kid_father_company = "";
        }
        else{
            this.kid_mother_name = "";
            this.kid_mother_phone = "";
            this.kid_mother_company = "";
            this.kid_mother_email = "";
            this.kid_mother_company = "";
            this.isMotherDisabled = false;
        }
    }

    makeFatherNotApplicable(e){
        if(e.target.checked){
            this.mothernotapplicable = false;
            this.isMotherDisabled = false;
            this.fathernotapplicable = true;
            this.isFatherNa = true;
            this.kid_father_name = "N/A";
            this.kid_father_phone = "N/A";
            this.kid_father_company = "N/A";
            this.kid_father_email = "N/A";
            this.kid_father_company = "N/A";
            this.kid_mother_name = "";
            this.kid_mother_phone = "";
            this.kid_mother_company = "";
            this.kid_mother_email = "";
            this.kid_mother_company = "";
            this.isFatherDisabled = true;
        }
        else{
            this.kid_father_name = "";
            this.kid_father_phone = "";
            this.kid_father_company = "";
            this.kid_father_email = "";
            this.kid_father_company = "";
            this.isFatherDisabled = false;
        }
    }

    constructor(private http: Http) {}

    ngOnInit() {}
}
