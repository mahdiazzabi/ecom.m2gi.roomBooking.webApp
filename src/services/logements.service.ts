import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import { Logement } from "../model/model.logement";
import { Observable } from "rxjs/Observable";
import { Recherche } from "../utils/utils.recherche";
@Injectable()
export class LogementsServices{

  constructor(public http:Http){

  }
  
  getLogements(page:number, size:number){
    return this.http.get("http://localhost:8080/RoomBookingWeb/pagelogement/"+page+"/"+size)
      .map((resp)=>resp.json());

  }
  getLogementsByRecherche(page:number, size:number, recherche:Recherche){
    return this.http.get(`http://localhost:8080/RoomBookingWeb/pagelogementRecherche/${page}/${size}/${JSON.stringify(recherche)}`).map((resp)=>resp.json());

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
