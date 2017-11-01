import { Component, OnInit } from '@angular/core';
import { Logement } from '../../model/model.logement';

@Component({
  selector: 'app-proposer-logements-hote',
  templateUrl: './proposer-logements-hote.component.html',
  styleUrls: ['./proposer-logements-hote.component.css']
})
export class ProposerLogementsHoteComponent implements OnInit {

  newLogement: Logement ;
  constructor() {
    this.newLogement = new Logement() ;
   }

  ngOnInit() {
  }

  saveLogement(){
    console.log(this.newLogement );
  }

}
