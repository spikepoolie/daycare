import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, transition, style, animate, group } from '@angular/animations';
import { BrowserModule } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'loginregistration',
  templateUrl: './loginregistration.component.html',
  styleUrls: ['./loginregistration.component.css'],
  animations: [
    trigger('fadeInAnimation', [
      transition(':enter', [
          style({ opacity: 0 }),
          animate(1500)
      ]),
      transition('* => void', [
        animate(0, style({opacity:1}))
      ])
    ]),
    trigger('fadeInAnimation1', [
      transition(':enter', [
          style({ opacity: 0 }),
          animate(1500)
      ]),
      transition(':leave', [
        animate(0, style({opacity:0}))
      ]),
      
    ])
    ,
    trigger('fadeInSpinner', [
      transition(':enter', [
          style({ opacity: 0 }),
          animate(800)
      ]),
      transition(':leave', [
        animate(800, style({opacity:0}))
      ]),
      
    ]),
    trigger('scaleForm', [
      transition(':enter', [
          style({ transform: 'scale(1.1)' }),
          animate(1000)
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
  ]),
  trigger('recoveraccount', [
    transition(':enter', [
      style({transform: 'translateY(100%)', 'opacity':0}),
      animate('500ms', style({transform: 'translateY(0)', 'opacity': 1}))
    ]),
    transition(':leave', [
      
       style({transform: 'translateY(0)', 'opacity':1}),
      animate('500ms', style({transform: 'translateY(100%)', 'opacity': 0}))
    ])
  ])
  ] 
})

export class LoginregistrationComponent implements OnInit{
  @ViewChild("myinput") inputEl: ElementRef;
  myOption:string = 'login';
  isSubmitting:boolean = false;
  showSpinner:boolean = false;
  showSpinnerPassword:boolean = false;
  hasCorrectLogin:boolean = true;
  isRecoverAccount:boolean = false;
  hasCorrectEmail:boolean = true;
  hasCorrectEmailMessage:boolean = false;
  hasUserName:boolean = true;
  hasPassWord:boolean = true;
  emailRecover:string = "";
  hasEmail: boolean = true;
  hasRegistrationEmail: boolean = true;
  hasRegistrationPassword: boolean = true;
  hasPasswordMatch: boolean = true;
  hasConfirmPassword:boolean = true;
  hasEmailEntered:boolean = false;
  hasEnteredConfirmPassword:boolean = false;
  myPassword:string = "";
  hasAccount:boolean = false;

  private urlCheckLogin:string = "http://www.goemobile.com/mobile/daycare/php/check_login.php";
  private urlRecoverPassword:string = "http://www.goemobile.com/mobile/daycare/php/retrieve_password.php";
  private urlCreateAccount:string = "http://www.goemobile.com/mobile/daycare/php/create_account.php";

  constructor(private http: Http){
    
  }

  enableSubmitRegister(){
    this.hasEnteredConfirmPassword = true;
  }

  enableRegistrationPassword(emailValue:HTMLInputElement){
      this.hasEmailEntered = true;
      this.hasRegistrationEmail = true;
      this.hasAccount = false;
  }

  enableRegistrationConfirmPassword(pwdValue:any){
    if(pwdValue){
      this.hasRegistrationPassword = true;
      this.hasEnteredConfirmPassword = true;
      this.myPassword = pwdValue;
    }
    else{
      this.hasEnteredConfirmPassword = false;
    }
  }

  checkForConfirmPassword(confPwd){
    if(!confPwd){
      this.hasEnteredConfirmPassword = false;
    }
    else{
      this.enableSubmitRegister();
      this.hasEnteredConfirmPassword = true;
    }
    
    if(confPwd !== this.myPassword){
      this.hasPasswordMatch = false;
    }
    else{
      this.hasPasswordMatch = true;
    }
  }

  whatToUse(option){

    this.hasCorrectLogin = true;
    if(!this.isSubmitting){
      if(option == 'login'){
        this.myOption = 'login';
      }
      else{
        this.myOption = 'register';
      }
    }
  }

  getOpacity(){
    if(this.isRecoverAccount) {
      return 0.3;
      
    } else {
      return 1;
    }
  }

  checkLogin(frm:HTMLFormElement){
    if(frm.username == ''){
      this.hasUserName = false;
    }
    else{
      this.hasUserName = true;
    }
    if(frm.password == ''){
      this.hasPassWord = false;
    }
    else{
      this.hasPassWord = true;
    }
    this.isSubmitting = true;
    this.showSpinner = true;
    this.hasCorrectLogin = true;
    
    this.http.post(this.urlCheckLogin, JSON.stringify(frm))
      .subscribe(response => {
        this.showSpinner = false;
        this.isSubmitting = false;
        if(response.json().isMember == 1)
          this.hasCorrectLogin = true;
        else
          this.hasCorrectLogin = false;
      }
    );
  }

  checkRegistration(frm:HTMLFormElement){
    if(frm.email == ''){
      this.hasRegistrationEmail = false;
    }
    else{
      this.hasRegistrationEmail = true;
    }
    if(frm.registrationpassword == ''){
      this.hasRegistrationPassword = false;
    }
    else{
      this.hasRegistrationPassword = true;
    }
    if(frm.confirmpassword == ''){
      this.hasConfirmPassword = false;
    }
    else{
      this.hasConfirmPassword = true;
    }

    if(frm.registrationpassword !== frm.confirmpassword){
      this.hasPasswordMatch = false;
    }
    else{
      this.hasPasswordMatch = true;
    }
    this.hasAccount = false;
    this.isSubmitting = true;
    this.showSpinner = true;
    this.http.post(this.urlCreateAccount, JSON.stringify(frm))
      .subscribe(response => {
        this.showSpinner = false;
        this.isSubmitting = false;
        console.log(response.json());
        if(response.json().result == 'OK'){
          console.log('worked');
        }
        else if(response.json().result == 'exist'){
            this.hasAccount = true;
        }
        else{
           console.log('did not worked');
        }
      }
    );
  }

  clearSentRecoverPasswordMessage(){
    this.hasCorrectEmailMessage = false;
  }

  RemoveRequiredEmail(){
    this.hasEmail = true;
  }

  recoverPasswordForm(frmRetrievePwd:HTMLFormElement){
    this.hasCorrectLogin = true;
    this.isRecoverAccount = true;
    this.hasCorrectEmailMessage = false;
    setTimeout(()=>{   
      this.focusInput();  
    },0.5);
    
  }

  focusInput() {
    this.inputEl.nativeElement.focus();
  }

  recoverPasswordInfo(frmRetrievePwd:HTMLFormElement){
    this.hasCorrectEmail = true;
    this.emailRecover = frmRetrievePwd.email;
    if(this.emailRecover.length > 0){
      this.hasEmail = true;
      this.showSpinnerPassword = true;
      this.http.post(this.urlRecoverPassword, JSON.stringify(frmRetrievePwd))
        .subscribe(response => {
          this.showSpinnerPassword = false;
          console.log(response);
          if(response.json().email != 'Not OK'){
            this.isRecoverAccount = false;
            this.hasCorrectEmail = true;
            this.hasCorrectEmailMessage = true;
          }
          else{
            this.hasCorrectEmail = false;
          }
        }
      );
    }
    else{
      this.hasEmail = false;
    }
  }

  cancelRecoverAcountInfo(){
    this.isRecoverAccount = false;
    this.hasCorrectEmail = true;
  }

  ngOnInit(){}
}
