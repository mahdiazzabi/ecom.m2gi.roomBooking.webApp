import { Component, OnInit } from '@angular/core';
import { Recherche } from '../../utils/utils.recherche';

@Component({
  selector: 'app-recherche-logement',
  templateUrl: './recherche-logement.component.html',
  styleUrls: ['./recherche-logement.component.css']
})
export class RechercheLogementComponent implements OnInit {
  recherche: Recherche ;

  constructor() {
    this.recherche = new Recherche();
   }

  ngOnInit() {
  }
  rechercheLogement(){
    console.log( this.recherche);

  }
}
