import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../../model/model.client';
import { Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestOptions , Headers } from '@angular/http';
import {isNumber} from "util";
import {Alert, AlertCenterService, AlertType} from "ng2-alert-center";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

 newClient : any;
 savingErr: any = null;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,private clientService:ClientService,private servicealert:AlertCenterService ) {
   }

  ngOnInit() {

  }

  sendAnAlertPhone(msg:string ) {
    const alert = Alert.create(AlertType.DANGER, msg, 3000 ,true);
    this.servicealert.alert(alert);
  }


  onSaveClient(dataForm){

      //TODO : synchroniser newClient avec ngModel directement et enlever le parametre dataForm
    if (!isNumber(parseInt(dataForm.telephone)) || (dataForm.telephone.length<10))
        {
          this.sendAnAlertPhone('<span class="glyphicon glyphicon-hand-right"></span> <strong>Erreur de saisi</strong>\n' +
            '                <hr class="message-inner-separator">\n' +
            '                <p>\n' +
            '                   Numero de Tèlèphone est <b>Invalid</b>.</p>');
        }else if (dataForm.mdp!=dataForm.mdp2){
       this.sendAnAlertPhone('<span class="glyphicon glyphicon-hand-right"></span> <strong>Erreur de saisi</strong>\n' +
        '                <hr class="message-inner-separator">\n' +
        '                <p>\n' +
        '                  Les 2 mots de passe ne sont pas  <b></b>Identiques</b>.</p>');
      }else {
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
}
