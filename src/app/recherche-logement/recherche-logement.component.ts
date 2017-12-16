import { Component, OnInit } from '@angular/core';
import { Recherche } from '../../utils/utils.recherche';
import {ResultatRechercheComponent} from '../resultat-recherche/resultat-recherche.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as moment from 'moment';
@Component({
  selector: 'app-recherche-logement',
  templateUrl: './recherche-logement.component.html',
  styleUrls: ['./recherche-logement.component.css']
  
})
export class RechercheLogementComponent implements OnInit {
  recherche: Recherche ;
  public RechercheForm: FormGroup;
  fromRecherche: Boolean ;
  constructor(private fb: FormBuilder ) {
    this.recherche = new Recherche();
    this.initRechercheForm();
    this.fromRecherche = false ;
   }
 
   public initRechercheForm() {
     return (this.RechercheForm = this.fb.group({
       dateFrom: [null, Validators.required],
       dateTo: [null, Validators.required],
       ville: [null, Validators.required],
       nbrVoyageur: [null, Validators.required],

     }));
   }
  ngOnInit() {  
  }
  rechercheLogement(){

    if (!this.RechercheForm.valid) {
      //send msg erreur validation
      return;
    }else if (moment(this.RechercheForm.get('dateFrom').value).isSameOrAfter(moment(this.RechercheForm.get('dateTo').value))) {
     //send msg erreur validation range date invalide
      return ;
    }
    this.recherche = new Recherche();
    this.recherche.dateDebut = this.RechercheForm.get('dateFrom').value;
    this.recherche.dateFin = this.RechercheForm.get('dateTo').value;
    this.recherche.villeRecherche = this.RechercheForm.get('ville').value;
    this.recherche.nbrVoyageur = this.RechercheForm.get('nbrVoyageur').value;
    this.fromRecherche = true ;

  }
}
