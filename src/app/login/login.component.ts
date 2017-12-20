import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from '../../model/model.client';
import {Alert, AlertCenterService, AlertType} from "ng2-alert-center";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentClient: Client ;
  savingErr: any = null;
  dispaly: boolean;

   constructor(private activatedRoute: ActivatedRoute,
     private router: Router,private clientService:ClientService ,private servicealert:AlertCenterService) {
    }
  ngOnInit() {
  }


/*  timeout() {
    setTimeout(() => {
    this.dispaly = false;
    }, 5000);
  }*/

  sendAnAlert(msg:string ) {
    const alert = Alert.create(AlertType.DANGER, msg, 3000 ,true);

   //this.dispaly=true;

    this.servicealert.alert(alert);

    //this.timeout();
  }

  onLogin(dataForm){

    this.clientService.logIn(dataForm.mail ,btoa( dataForm.mdp)).subscribe(response => {
      if (response.err) {
        this.savingErr = response.err;

        this.sendAnAlert('<span class="glyphicon glyphicon-hand-right"></span> <strong>Erreur d\'authentification</strong>\n' +
          '                <hr class="message-inner-separator">\n' +
          '                <p>\n' +
          '                   Email ou Mot de passe <b>Incorrect</b>.</p>');

      } else {
        this.currentClient = response.client ;
        sessionStorage.setItem("currentUser" ,JSON.stringify(this.currentClient));
        this.router.navigate(['/recherche', {currentClient : this.currentClient  }]);
      }
    });
  }
}
