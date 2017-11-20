import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
@Injectable()
export class LogementsServices{

  constructor(public http:Http){

  }

  getLogements(page:number, size:number){
    return this.http.get("http://localhost:8080/RoomBookingWeb/pagelogement/"+page+"/"+size)
      .map((resp)=>resp.json());

  }

}
