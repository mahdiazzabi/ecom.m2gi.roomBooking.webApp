import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Image} from "../model/model.image";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ImageServices {

  constructor(public http:Http){

  }

  InsertImagePah(image:Image):Observable<ImageResponse> {
    console.log(image);
    return this.http.post(`http://localhost:8080/RoomBookingWeb/image`,image).map(resp=>{
        const body: any = resp.json();
        return {err: null, image: body };
      }
    );
  }
}

export interface ImageResponse {
  err: any;
  image: Image;
}
