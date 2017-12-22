import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import { Reservation } from "../model/model.reservation";
import { Observable } from "rxjs/Observable";
import { environment as env } from './../environments/environment';

@Injectable()
export class ReservationServices{

  constructor(public http:Http){

  }

  

  public addReservations(reservation:Reservation):Observable<ReservationResponse> {
    console.log(reservation);
    return this.http.post(`${env.serverUrl}/RoomBookingWeb/reservation`,reservation).map(resp=>{
      const body: any = resp.json();
      return {err: null, reservation: body };
        }
      );
  } 

  
}
export interface ReservationResponse {
  err: any;
  reservation: Reservation;
}
