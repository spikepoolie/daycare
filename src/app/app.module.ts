
import { NewkidregistrationComponent } from './newkidregistration/newkidregistration.component';
import { ServerrequestService } from './serverrequest.service';
import { NapComponent } from './nap/nap.component';
import { OptionsComponent } from './options/options.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from './../environments/environment';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginregistrationComponent } from './loginregistration/loginregistration.component';
import { NavbarComponent } from './navbar/navbar.component' 
import { PersistenceModule } from 'angular-persistence';
import { KidsComponent } from './kids/kids.component';
import { FoodnapdiaperComponent } from './foodnapdiaper/foodnapdiaper.component';
import { FoodnapdiaperkidComponent } from './foodnapdiaperkid/foodnapdiaperkid.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginregistrationComponent,
    HomeComponent,
    NotfoundComponent,
    NavbarComponent,
    OptionsComponent,
    KidsComponent,
    FoodnapdiaperComponent,
    FoodnapdiaperkidComponent,
    NewkidregistrationComponent,
    NapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    PersistenceModule,    
    RouterModule.forRoot([
      { 
        path :'newkidregistration',
        component : NewkidregistrationComponent
      },
      { 
        path :'foodnapdiaper',
        component : FoodnapdiaperComponent
      },
      { 
        path :'loginregistration',
        component : LoginregistrationComponent
      },
      { 
        path :'options',
        component : OptionsComponent
      },
      { 
        path :'kids',
        component : KidsComponent
      },
      { 
        path :'foodnapdiaperkid/:kid_id/:kid_name/:kid_picture_url',
        component : FoodnapdiaperkidComponent
      },
      { 
        path :'foodnapdiaper',
        component : FoodnapdiaperComponent
      },
      { 
        path :'**',
        component : NotfoundComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
