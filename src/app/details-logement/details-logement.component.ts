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
  
  constructor( public logementService:LogementsServices, public route:ActivatedRoute) { }

  ngOnInit() {
    //this.mode;
    //this.mode=this.route.snapshot.params['mode'];
    //this.logement=this.route.snapshot.params['logement'];
    console.log(this.logement);
  }

}
