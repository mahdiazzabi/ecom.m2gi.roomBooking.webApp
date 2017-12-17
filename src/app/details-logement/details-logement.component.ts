import { Component, OnInit, Input ,EventEmitter, Output} from '@angular/core';
import { Logement } from '../../model/model.logement';
import { ActivatedRoute } from '@angular/router';
import { LogementsServices } from '../../services/logements.service';


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
    let tab_logs:Logement[]= JSON.parse(localStorage.getItem("panier_array_logs"));
    if (tab_logs){

      if (tab_logs.find(x => x.id_logement == log.id_logement)){
        alert("Vous avez déja ajouter ce logement à votre panier!");
      }
      else
      {
        tab_logs.push(log);
        localStorage.setItem("panier_array_logs",JSON.stringify(tab_logs));
      }

    }else {
      let tab_logs:Logement[] = [log] ;
      localStorage.setItem("panier_array_logs",JSON.stringify(tab_logs));
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
