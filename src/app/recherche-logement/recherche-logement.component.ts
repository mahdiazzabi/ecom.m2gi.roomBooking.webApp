import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Recherche } from '../../utils/utils.recherche';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as moment from 'moment';
import {Router} from "@angular/router";

@Component({
  selector: 'app-recherche-logement',
  templateUrl: './recherche-logement.component.html',
  styleUrls: ['./recherche-logement.component.css']

})
export class RechercheLogementComponent implements OnInit {
  recherche: Recherche ;
  public RechercheForm: FormGroup;
  doResearchNow: Boolean ;


  constructor(private fb: FormBuilder, private router: Router) {
    this.recherche = new Recherche();
    this.initRechercheForm();
    this.doResearchNow = false ;
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

   /* if(sessionStorage.getItem("currrentUser")===null)
      {
        this.router.navigate(['/recherche']);
      }*/

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
    this.doResearchNow = true ;
  }
}
