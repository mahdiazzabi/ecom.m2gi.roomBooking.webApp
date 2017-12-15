import {Input, Component, OnInit,OnChanges, ViewChild, SimpleChanges  } from '@angular/core';
import { Recherche } from '../../utils/utils.recherche';

@Component({
  selector: 'app-resultat-recherche',
  templateUrl: './resultat-recherche.component.html',
  styleUrls: ['./resultat-recherche.component.css']
})
export class ResultatRechercheComponent implements OnInit {

  @Input('recherche') recherche: Recherche;
  
  @Input('fromRecherche') fromRecherche: Boolean;

  public getSearchStatus : Boolean ;

  constructor() { 
  }

  ngOnchanges(changes : SimpleChanges){
   console.log( this.getSearchStatus);
  }
  
  resultat(value:Boolean){
    this.getSearchStatus = value ;
  }

  
  ngOnInit() {
    
  }
 
}
