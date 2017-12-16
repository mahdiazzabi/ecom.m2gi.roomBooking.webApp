import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import { Logement } from "../model/model.logement";
import { Observable } from "rxjs/Observable";
@Injectable()
export class LogementsServices{

  constructor(public http:Http){

  }

  getLogements(page:number, size:number){
    return this.http.get("http://localhost:8080/RoomBookingWeb/pagelogement/"+page+"/"+size)
      .map((resp)=>resp.json());

  }
  getLogement(id:number){
     return this.http.get("http://localhost:8080/RoomBookingWeb/logement/"+id)
     .map((resp)=>resp.json());
  }


  public addLogements(logement:Logement):Observable<LogementResponse> {
    console.log(logement);
    return this.http.post(`http://localhost:8080/RoomBookingWeb/logement`,logement).map(resp=>{
      const body: any = resp.json();
      return {err: null, logement: body };
        }
      );
  } 

  
}
export interface LogementResponse {
  err: any;
  logement: Logement;
}
