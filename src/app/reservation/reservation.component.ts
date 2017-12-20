import { Component, OnInit } from '@angular/core';
import { ReservationServices } from '../../services/reservation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestOptions , Headers } from '@angular/http';
import { Client } from '../../model/model.client';
import { Logement } from '../../model/model.logement';
import {Reservation} from '../../model/model.reservation';
import {Alert, AlertCenterService, AlertType} from "ng2-alert-center";


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
  constructor(private activatedRoute: ActivatedRoute, private router: Router,private reservationService:ReservationServices,
              private servicealert:AlertCenterService) { }

  ngOnInit() {
  }

  sendAnAlertPayer(msg:string ) {
    const alert = Alert.create(AlertType.INFO, msg, 3000 ,true);
    this.servicealert.alert(alert);
  }
  timeout() {
    setTimeout(() => {
      this.router.navigate(['/recherche']);
    }, 3500);
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
    this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    console.log(JSON.stringify(this.currentUser));
    for(let R of this.get_logement()){
        this.reservationService.addReservations(R).subscribe(response => {
          if (response.err) {
            this.savingErr = response.err;
          } else {

            this.sendAnAlertPayer('<span class="glyphicon glyphicon-info-sign"></span> <strong>Paiement réussi</strong> '+
              '<hr class="message-inner-separator">' +
              '<p><b>Nous vous avons envoyé Email récapitulatif de votre Réservation</b></p>');
               localStorage.setItem("panier_array_logs",JSON.stringify(null));
               this.timeout();

          }
        });

    }


  }

}
