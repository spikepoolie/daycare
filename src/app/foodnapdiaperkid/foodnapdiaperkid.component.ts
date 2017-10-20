import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { trigger, state, transition, style, animate, group } from '@angular/animations';

@Component({
  selector: 'app-foodnapdiaperkid',
  templateUrl: './foodnapdiaperkid.component.html',
  styleUrls: ['./foodnapdiaperkid.component.css'],
  animations:[
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
    ]),
    trigger('itemAnim2', [
      transition(':enter', [
        style({transform: 'translateX(-90%)'}),
        animate(300)
      ]),
      transition(':leave', [
        group([
          animate(700, style({
            transform: 'translate(-180%)'
          })),
          animate(300, style({
            opacity: 0
          }))
        ])
      ])
    ])
    ]
})

export class FoodnapdiaperkidComponent implements OnInit {
  
  missingNapToHours:boolean = false;
  missingNapFromHours:boolean = false;
  hasFromNap:boolean = false;
  noformvalues:boolean = false;
  hasCorrectNapAmPm:boolean = true;
  hasToNap:boolean = false;
  isMissingDiaperType:boolean = false;
  isMissingDiaperTime:boolean = false;
  isMissingMeal:boolean = false;
  kidname:string;
  isFormValid:boolean = true;
  showSpinner:boolean = false;
  isSubmitting:boolean = false;
  isRecordInserted:boolean = false;
  isUpdatingEntry:boolean = false;

  data:Object;
  myEntryForm:any;

  diaperType:string;
  kidpicture:string;
  myMeal:string;
  isPM:string;
  napFromAmPm:string;
  mealAmPm:string;
  napToAmPm:string;
  diaperAmPm:string;
  mealTime:string;
  napFromHours:string;
  napToHours:string;
  diaperChangedAt:string;
  kid_id:number;
  entry_id:number;
  myDate:any;

  private myUrlPath = "http://www.goemobile.com/mobile/daycare/php/";
  private urlSaveEntry:string = this.myUrlPath + "/save_kid_entries.php";
  private urlGetKidEntries:string = this.myUrlPath + "get_kid_daily_entries.php";
  private urlDeleteEntry:string = this.myUrlPath + "delete_entry.php";
  private urlUpdateEntry:string = this.myUrlPath + "update_entry.php";
  
  values = ['am', 'pm'];
  diaperTypes = [
    "Wet", "BM", "Dry", "Wet/BM"
  ]

  fromHours = [
    "07:00", "07:15", "07:30", "07:45",
    "08:00", "08:15", "08:30", "08:45",
    "09:00", "09:15", "09:30", "09:45",
    "10:00", "10:15", "10:30", "10:45",
    "11:00", "11:15", "11:30", "11:45",
    "12:45"
  ];

  amPm = ["am","pm"];

  toHours = [
    "01:00 pm", "01:15 pm", "01:30 pm", "01:45 pm",
    "02:00 pm", "02:15 pm", "02:30 pm", "02:45 pm",
    "03:00 pm", "03:15 pm", "03:30 pm", "03:45 pm",
    "04:00 pm", "04:15 pm", "04:30 pm", "04:45 pm",
    "05:00 pm", "05:15 pm", "05:30 pm", "05:45 pm",
    "06:00 pm", "06:15 pm", "06:30 pm", "06:45 pm",
    "07:00 pm"
  ];

  hoursOptions = [
    "01:00", "01:15", "01:30", "01:45",
    "02:00", "02:15", "02:30", "02:45",
    "03:00", "03:15", "03:30", "03:45",
    "04:00", "04:15", "04:30", "04:45",
    "05:00", "05:15", "05:30", "05:45",
    "06:00", "06:15", "06:30", "06:45",
    "07:00", "07:15", "07:30", "07:45",
    "08:00", "08:15", "08:30", "08:45",
    "09:00", "09:15", "09:30", "09:45",
    "10:00", "10:15", "10:30", "10:45",
    "11:00", "11:15", "11:30", "11:45",
    "12:00", "12:15", "12:30", "12:45",
    
  ];

  
  constructor(private route: ActivatedRoute,private http: Http) { }

  addEntry(frm){
    this.noformvalues = false;
    this.isMissingDiaperType = false;
    this.isMissingDiaperTime = false;
    this.isRecordInserted = false;
    if((frm.napFromHours == '' ||  frm.napFromHours == undefined ||  frm.napFromHours == null) && 
        (frm.napToHours == '' || frm.napToHours == undefined || frm.napToHours == null) && 
        (frm.mealTime == '' || frm.mealTime == undefined || frm.mealTime == null) && 
        (frm.diaperType  instanceof Array || frm.diaperType == null  || frm.diaperType == '') &&
        (frm.diaperChangedAt == '' || frm.diaperChangedAt == undefined)
      ){
      this.noformvalues = true;
      this.isFormValid = false;
    }
    else{
      this.noformvalues = false;
      this.isFormValid = true;
    }

    if(frm.mealAmPm != '' && frm.mealAmPm != undefined && frm.mealAmPm != null){
      if(frm.myMeal == '' || frm.myMeal == undefined || frm.myMeal == null){
        this.isMissingMeal = true;
      }
      else{
        this.isMissingMeal = false;
        this.noformvalues = false;
      }
    }
    else{
      this.isMissingMeal = false;
    }
    
    if(frm.napFromAmPm != '' && frm.napFromAmPm != undefined){
      if(frm.napToHours == '' || frm.napToHours == undefined){
        this.missingNapToHours = true;
        
      }
    }
    if(frm.napToAmPm != '' && frm.napToAmPm != undefined){
      if(frm.napFromHours == '' || frm.napFromHours == undefined){
        this.missingNapFromHours = true;
      }
    }
    
    if(!this.noformvalues){
      if(typeof frm.diaperAmPm == 'string' && frm.diaperAmPm != '' && frm.diaperAmPm != undefined){
        if(frm.diaperType == null){
          this.isMissingDiaperType = true;
        }
        if(frm.diaperTye instanceof Array){
          this.isMissingDiaperType = true;
        }
        if(frm.diaperType == undefined){
          this.isMissingDiaperType = true;
        }
        if(frm.diaperType == ''){
          this.isMissingDiaperType = true;
        }
      }
      else{
        this.isMissingDiaperType = false;
      }
    }
    else{
      this.isMissingDiaperType = false;
    }

    if(frm.diaperType != undefined && frm.diaperType != '' && frm.diaperType != null){
      if(typeof frm.diaperChangedAt != 'string' || frm.diaperChangedAt == '' || frm.diaperChangedAt == undefined){
        this.isMissingDiaperTime = true;
      }
      else{
        this.isMissingDiaperTime = false;
      }
    }
    else{
      this.isMissingDiaperTime = false;
    }

     if(!this.hasCorrectNapAmPm || this.missingNapToHours || this.missingNapFromHours || this.noformvalues || this.isMissingDiaperType || this.isMissingDiaperTime || this.isMissingMeal){
       this.isFormValid = false;
     }

     if(this.isFormValid){
       this.saveEntry(frm);
     }
  }

  saveEntry(frm){
    this.isUpdatingEntry = false;
    this.http.post(this.urlSaveEntry, JSON.stringify(frm))
      .subscribe(response => {
        this.showSpinner = false;
        this.isSubmitting = false;
        if(response.json().result == 'OK'){
          this.isRecordInserted = true;
          this.getKidEntries();
          this.clearFormFields();
          setTimeout(()=>{ 
            this.isRecordInserted = false;
            this.isUpdatingEntry = false;
          },2000);
        }
        else{
          this.isRecordInserted = false;
          alert('Something went wrong: ' + response.json().result);
        }
      }
    );
  }

  deleteEntry(id){
    this.isUpdatingEntry = false;
    let myEntry = '{"entry_id":' + id + '}';
    this.http.post(this.urlDeleteEntry, myEntry)
      .subscribe(response => {
        this.showSpinner = false;
        this.isSubmitting = false;
        if(response.json().result == 'OK'){
          
          this.getKidEntries();
          
        }
        else{
          alert('Something went wrong: ' + response.json().result);
        }
      }
    );
  }

  updateEntry(frm){
    this.isUpdatingEntry = false;
    this.http.post(this.urlUpdateEntry, JSON.stringify(frm))
      .subscribe(response => {
        this.showSpinner = false;
        this.isSubmitting = false;
        if(response.json().result == 'OK'){
          this.isRecordInserted = true;
          this.getKidEntries();
          this.clearFormFields();
          setTimeout(()=>{ 
            this.isRecordInserted = false;
          },2000);
          this.isUpdatingEntry = false;
        }
        else{
          this.isRecordInserted = false;
          alert('Something went wrong: ' + response.json().result);
        }
      }
    );
  }

  editEntry(entry){
    this.entry_id = entry.entry_id;

    this.isUpdatingEntry = true;
    let myNapFromHoursArray = entry.kid_nap_from.split(' ');
    this.napFromHours = myNapFromHoursArray[0];
    this.napFromAmPm = myNapFromHoursArray[1];

    let myNapToHoursArray = entry.kid_nap_to.split(' ');
    this.napToHours = myNapToHoursArray[0];
    this.napToAmPm = myNapToHoursArray[1];

    let myMealTimeArray = entry.kid_meal_time.split(' ');
    this.mealTime = myMealTimeArray[0];
    this.mealAmPm = myMealTimeArray[1];
    this.myMeal = entry.kid_meal;

    let myDiaperChangedTimeArray = entry.kid_diaper_change_time.split(' ');
    this.diaperChangedAt = myDiaperChangedTimeArray[0];
    this.diaperAmPm = myDiaperChangedTimeArray[1];
    this.diaperType = entry.kid_diaper_type;

  }

  clearFormFields(){
    this.noformvalues = false;
    this.missingNapToHours = false;
    this.missingNapFromHours = false;
    this.hasFromNap = true;
    this.noformvalues = false;
    this.hasCorrectNapAmPm = true;
    this.isMissingMeal = false;
    this.isMissingDiaperTime = false;
    this.hasToNap = true;
    this.isMissingDiaperType = false;
    this.napToAmPm = "";
    this.napFromAmPm = "";
    this.napFromHours = "";
    this.napToHours = "";
    this.mealTime = "";
    this.mealAmPm = "";
    this.myMeal = "";
    this.diaperChangedAt = "";
    this.diaperType = "";
    this.diaperAmPm = "";
    this.entry_id = 0;
    this.isUpdatingEntry = false;
  }

  getAmPm(frmvalue){
    this.noformvalues = false;
    if(frmvalue !== ''){
      var now= new Date(), 
      ampm= 'am', 
      h= now.getHours(), 
      m= now.getMinutes(), 
      s= now.getSeconds();
      if(h>= 12){
          if(h>12) h -= 12;
          ampm= 'pm';
      }
      return ampm;
    }
    else{
      return '';
    }
  }

  CheckNapAmPm(frmvalue,selectype){
    this.noformvalues = false;
    if(selectype == 'napfrom'){
      this.napFromAmPm  = frmvalue;
    }
    else if(selectype == 'napto'){
      this.napToAmPm  = frmvalue;
    }
    
    if(this.napFromAmPm == 'pm' && this.napToAmPm == 'am'){
      this.hasCorrectNapAmPm = false;
    }
    else{
      this.hasCorrectNapAmPm = true;
    }
  }

  SetNapAmPm(frmvalue,selectype){
    this.noformvalues = false;
    this.isMissingMeal = false;
    this.isMissingDiaperTime = false;
    this.isPM = this.getAmPm(frmvalue);
    if(selectype == 'napfrom'){
      if(frmvalue == ''){
        this.hasFromNap = false;
        //this.napToHours = "";
        this.hasToNap = false;
        this.napToAmPm = "";
        this.missingNapFromHours = false;
      }
      else{
        this.hasFromNap = true;
        this.missingNapFromHours = false;
      }
      this.napFromAmPm = this.isPM;
      
    }
    
    if(selectype == 'napto'){
      if(frmvalue == ''){
        this.missingNapToHours = false;
        this.hasToNap = false;
      }
      else{
        this.missingNapToHours = false;
        this.hasToNap = true;
        this.napToAmPm = this.isPM;
      }
    }

    if(selectype == 'meal'){
      this.mealAmPm = this.isPM;
    }

    if(selectype == 'diaper'){
      this.diaperAmPm = this.isPM;
    }
    //this.napToAmPm = this.isPM;
  }

  getKidEntries(){
    let myEntry = '{"kid_id":' + this.kid_id + '}';
    this.http.post(this.urlGetKidEntries, myEntry)
      .subscribe(response => {
          this.data = response.json();
    });
  }

  ngOnInit() {
    
    this.route.paramMap
      .subscribe(params=>{
        this.kid_id  = +params.get('kid_id');
        this.kidname = params.get('kid_name');
        this.kidpicture = params.get('kid_picture_url');
        this.getKidEntries();
    });
  }
}
