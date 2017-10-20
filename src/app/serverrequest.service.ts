import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class ServerrequestService {
  private urlGetKids:string = "http://www.goemobile.com/mobile/daycare/php/get_kids.php";
  data:Object;
  constructor(private http: Http) {}

  getKids(){
    this.http.get(this.urlGetKids)
      .subscribe(response => {
          this.data = response.json();
    });
  }
}
