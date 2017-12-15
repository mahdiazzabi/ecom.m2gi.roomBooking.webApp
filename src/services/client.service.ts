import { Injectable } from "@angular/core";
import { Client } from "../model/model.client";
import { Observable } from 'rxjs/Rx';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment as env } from '../environments/environment';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class ClientService{
    private loggedIn = new BehaviorSubject<boolean>(false);
    private currentClient = new BehaviorSubject<Client>(new Client());
    constructor(private http: Http) {

  
     }
  

   
     public save(client: Client): Observable<ClientResponse> {
      
      return this.http.post(`http://localhost:8080/RoomBookingWeb/client`,client).map(resp=>{
        const body: any = resp.json();
        return {err: null, client: body };
          }
        );
         }



    public update(client: Client): Observable<ClientResponse> {

      return this.http.post(`http://localhost:8080/RoomBookingWeb/client/update`,client).map(resp=>{
        const body: any = resp.json();
        sessionStorage.setItem("currentUser", JSON.stringify(body) )
        return {err: null, client: body };
          }
        )
        .catch(err=> {
          
          return Observable.of({err: err, client: null});
        });
      }

      
     
      get isLoggedIn() {
        
                return this.loggedIn.asObservable();
            }  
            
            get currentClientLogged() {
              
                      return this.currentClient.asObservable();
                  }
    
       
        public logIn(mail: String, mdp: String): Observable<ClientResponse> {
            return this.http.get(`http://localhost:8080/RoomBookingWeb/client/login/${mail}/${mdp}`).map(res => {
            const body: any = res.json();
              if (typeof(Storage) !== 'undefined'){
                sessionStorage.setItem("currentUser", JSON.stringify(body) )
              }
              
              this.loggedIn.next(true); 
              this.currentClient.next(body);
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