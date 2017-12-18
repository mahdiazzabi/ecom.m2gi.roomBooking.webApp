import { Component, OnInit } from '@angular/core';
import { ReservationServices } from '../../services/reservation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestOptions , Headers } from '@angular/http';
import { Client } from '../../model/model.client';
import { Logement } from '../../model/model.logement';
import {Reservation} from '../../model/model.reservation';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  providers: [ ReservationServices]
})
export class ReservationComponent implements OnInit {
  private currentUser : Client ;
  private logement: Logement;
  private date: Date;
  private duree:number;
  newReservation: Reservation ;
  savingErr: any = null;
   test = { logement:"1", date:"18/12/2017", duree:"2" }​​​​​​​;
  constructor(private activatedRoute: ActivatedRoute, private router: Router,private reservationService:ReservationServices) { }
  
  ngOnInit() {
  }
  onSaveReservation(){
    this.currentUser = JSON.parse(sessionStorage.getItem("currrentUser"));
     this.test=JSON.parse(localStorage.getItem("test"));
     
    console.log(JSON.stringify(this.currentUser));
    this.newReservation = {date:this.date , logement:this.logement,client:this.currentUser, duree:this.duree};  
    console.log(JSON.stringify(this.newReservation));

    this.reservationService.addReservations(this.newReservation).subscribe(response => {
      if (response.err) {
        this.savingErr = response.err;
      } else {

        this.router.navigate(['/reservation']);

      }
    });

}

}
