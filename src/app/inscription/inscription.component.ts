import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../../model/model.client';
import { Validators } from '@angular/forms';
import { InscriptionService } from '../../services/inscription.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestOptions , Headers } from '@angular/http';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  
 newClient: Client ;
 savingErr: any = null;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,private inscriptionService:InscriptionService) {

   }

  ngOnInit() {
  
  }

  onSaveClient(dataForm){  
    this.newClient = {nom:dataForm.nom,prenom:dataForm.prenom,email:dataForm.email,telephone:dataForm.telephone,mdp:dataForm.mdp,adresse:"",isHote:false};  
    //TODO : synchroniser newClient avec ngModel directement et enlever le parametre dataForm
    
    this.inscriptionService.save(this.newClient).subscribe(response => {
      if (response.err) {
        this.savingErr = response.err;
        //TODO : afficher le msg d'erreur
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
