import { Component, OnInit, Input ,EventEmitter, Output} from '@angular/core';
import { Logement } from '../../model/model.logement';
import { ActivatedRoute } from '@angular/router';
import { LogementsServices } from '../../services/logements.service';
import {Reservation} from "../../model/model.reservation";


@Component({
  selector: 'app-details-logement',
  templateUrl: './details-logement.component.html',
  styleUrls: ['./details-logement.component.css']
})
export class DetailsLogementComponent implements OnInit {

  @Input('currentLogement') logement:Logement;
  @Output() OTP = new EventEmitter<number>();

  sendMode(m : number){
    this.OTP.emit(m);
  }

  AddToCart(log:Logement){

    let rechrche:any = JSON.parse(localStorage.getItem("CurentRecherche"));

    let duree: number = Date.parse(rechrche.dateFin) - Date.parse(rechrche.dateDebut);

    duree = (duree)/(3600*24*1000);

    console.log("duree",duree);
    let res:Reservation =  new Reservation()
    res.logement = log;
    res.date_Debut = rechrche.dateDebut;
    res.date_Fin = rechrche.dateFin;
    res.prix_duree = duree*log.prix;
    res.client = JSON.parse( sessionStorage.getItem("currentUser")) ;

    let tab_reservations:Reservation[] = JSON.parse(localStorage.getItem("panier_array_logs"));

    if (tab_reservations){

      if (tab_reservations.find(x => x.logement.id_logement == log.id_logement)){
        alert("Vous avez déja ajouter ce logement à votre panier!");
      }
      else
      {
        tab_reservations.push(res);

        localStorage.setItem("panier_array_logs",JSON.stringify(tab_reservations));
      }
    }else {
      let tab_reservations:Reservation[] = [res] ;
      localStorage.setItem("panier_array_logs",JSON.stringify(tab_reservations));
    }
  }

  constructor( public logementService:LogementsServices, public route:ActivatedRoute) { }

  ngOnInit() {
    //this.mode;
    //this.mode=this.route.snapshot.params['mode'];
    //this.logement=this.route.snapshot.params['logement'];
    console.log(this.logement);
  }




}
