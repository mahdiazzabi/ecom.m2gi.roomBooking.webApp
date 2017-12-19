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
  savingErr: any = null;
  constructor(private activatedRoute: ActivatedRoute, private router: Router,private reservationService:ReservationServices) { }
  
  ngOnInit() {
  }
  get_logement():Reservation[]
  {
      let tab_logs:Reservation[]= JSON.parse(localStorage.getItem("panier_array_logs"));
      if (tab_logs){ 
        return tab_logs;
      }else {
        return null;
      }
  }
  onSaveReservation(){
    this.currentUser = JSON.parse(sessionStorage.getItem("currrentUser"));
     
    console.log(JSON.stringify(this.currentUser));
    for(let R of this.get_logement()){
        this.reservationService.addReservations(R).subscribe(response => {
          if (response.err) {
            this.savingErr = response.err;
          } else {

            this.router.navigate(['/reservation']);

          }
        });

    }
  

  }

}
