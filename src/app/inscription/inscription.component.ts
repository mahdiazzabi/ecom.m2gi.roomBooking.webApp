import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../../model/model.client';
import { Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestOptions , Headers } from '@angular/http';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  
 newClient : any;
 savingErr: any = null;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,private clientService:ClientService ) {

   }

  ngOnInit() {
  
  }

  onSaveClient(dataForm){  
      
    
      //TODO : synchroniser newClient avec ngModel directement et enlever le parametre dataForm
      this.newClient =  {nom:dataForm.nom,prenom:dataForm.prenom,email:dataForm.email,telephone:dataForm.telephone,mdp:btoa(dataForm.mdp),adresse:"",isHote:false};

    this.clientService.save(this.newClient).subscribe(response => {
      if (response.err) {
        this.savingErr = response.err;
        //TODO : afficher le msg d'erreur
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
