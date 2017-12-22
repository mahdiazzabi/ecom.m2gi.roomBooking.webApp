import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import { Logement } from "../model/model.logement";
import { Observable } from "rxjs/Observable";
import { Recherche } from "../utils/utils.recherche";
<<<<<<< HEAD
import { environment as env } from './../environments/environment';
=======
import {Image} from "../model/model.image";
>>>>>>> a045a143eb17709a1f1f3a38bf9b1c9ddd298926
@Injectable()
export class LogementsServices{

  constructor(public http:Http){

  }
  getLogements(page:number, size:number){
    return this.http.get(`${env.serverUrl}/RoomBookingWeb/pagelogement/${page}/${size}`)
      .map((resp)=>resp.json());

  }


  getLogement(id:number){
     return this.http.get(`${env.serverUrl}/RoomBookingWeb/logement/`+id)
     .map((resp)=>resp.json());
  }

  getLogementsByRecherche(page:number, size:number, recherche:Recherche){
    return this.http.get(`${env.serverUrl}/RoomBookingWeb/pagelogementRecherche/${page}/${size}/${JSON.stringify(recherche)}`).map((resp)=>resp.json());

  }
  getLogementsByClientHote(id:number){
    return this.http.get(`${env.serverUrl}/RoomBookingWeb/logementHote/${id}`).map((resp)=>resp.json());

  }

  addLogements(logement:Logement):Observable<LogementResponse> {
    console.log(logement);
    return this.http.post(`${env.serverUrl}/RoomBookingWeb/logement`,logement).map(resp=>{
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
