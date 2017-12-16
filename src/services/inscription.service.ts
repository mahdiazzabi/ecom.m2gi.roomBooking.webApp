import { Injectable } from "@angular/core";
import { Client } from "../model/model.client";
import { Observable } from 'rxjs/Rx';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment as env } from '../environments/environment';

@Injectable()
export class InscriptionService{
  
    constructor(private http: Http) {

     }
  

   
    public save(client: Client): Observable<ClientResponse> {
        
        return this.http.post(`http://localhost:8080/RoomBookingWeb/client`,client)
        .map(resp=>resp.json());
      }
  
      
    
      
}

export interface ClientResponse {
  err: any;
  client: Client;
}