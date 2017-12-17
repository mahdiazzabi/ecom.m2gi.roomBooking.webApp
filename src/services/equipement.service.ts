import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class EquipementService {

  constructor(public http:Http) { }

  getAllEquipement(){
    return this.http.get("http://localhost:8080/RoomBookingWeb/equipements").map((resp)=>resp.json());
  }

}
