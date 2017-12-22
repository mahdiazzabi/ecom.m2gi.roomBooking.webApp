import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import { environment as env } from './../environments/environment';

@Injectable()
export class EquipementService {

  constructor(public http:Http) { }

  getAllEquipement(){
    return this.http.get(`${env.serverUrl}/RoomBookingWeb/equipements`).map((resp)=>resp.json());
  }

}
