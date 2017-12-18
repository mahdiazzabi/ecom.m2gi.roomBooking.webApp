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
  constructor(private activatedRoute: ActivatedRoute, private router: Router,private reservationService:ReservationServices) { }
  
  ngOnInit() {
  }
  get_logement():Logement[]
  {
      let tab_logs:Logement[]= JSON.parse(localStorage.getItem("panier_array_logs"));
      if (tab_logs){ 
        return tab_logs;
      }else {
        return null;
      }
  }
  onSaveReservation(){
    this.currentUser = JSON.parse(sessionStorage.getItem("currrentUser"));
     
    console.log(JSON.stringify(this.currentUser));
    for(let l of this.get_logement()){
      //this.newReservation = {dateDebut:this.date,  logement:l,client:this.currentUser};  
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

}
