import { Injectable } from "@angular/core";
import { Client } from "../model/model.client";
import { Observable } from 'rxjs/Rx';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment as env } from '../environments/environment';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class LoginService{
  
  private loggedIn = new BehaviorSubject<boolean>(false);
  
  get isLoggedIn() {
  
          return this.loggedIn.asObservable();
      }

  


    constructor(private http: Http) {

     }
  

   
    public logIn(mail: String, mdp: String): Observable<ClientResponse> {
        return this.http.get(`http://localhost:8080/RoomBookingWeb/client/login/${mail}/${mdp}`).map(res => {
        const body: any = res.json();
          console.log(JSON.stringify(body, null, 2));
          if (typeof(Storage) !== 'undefined'){
            sessionStorage.setItem("currrentUser", JSON.stringify(body) )
          }
          
          this.loggedIn.next(true); 
          return { err: null, client: body};
        })
        .catch(err => {
          console.log('Server error: ' + JSON.stringify(err, null, 2));
          return Observable.of({err: err, client: null});
        })
        ; }

      public logOut() {
        
        this.loggedIn.next(false); 
          if (typeof(Storage) !== 'undefined'){
            sessionStorage.removeItem("currentUser");
          }
         }
      
     
      
}

export interface ClientResponse {
  err: any;
  client: Client;
}