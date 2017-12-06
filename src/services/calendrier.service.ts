import { Injectable } from "@angular/core";
import { Calendrier } from "../model/model.Calendrier";
import { Observable } from 'rxjs/Rx';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment as env } from '../environments/environment';

@Injectable()
export class CalendrierService{
  
    constructor(private http: Http) {

     }
  

  
     public addInDispo(calender:Calendrier):Observable<CalendrierResponse> {
      
      return this.http.post(`http://localhost:8080/RoomBookingWeb/dispo`,calender).map(resp=>{
      const body: any = resp.json();
      return {err: null, calendrier: body , listCalendrier: null};
        }
      );
    }
    
    get_CalendrierLogement(id){
      return this.http.get(`http://localhost:8080/RoomBookingWeb/dispos/logement/${id}`).map(resp=>{
        const body2: any = resp.json();
         return {err: null ,listCalendrier: body2};
          }
        );
      }
      
}

export interface CalendrierResponse {
  err: any;
  calendrier: Calendrier;
  listCalendrier : Calendrier[];
}