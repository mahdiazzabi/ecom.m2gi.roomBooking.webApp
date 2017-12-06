import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from '../../model/model.client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentClient: Client ;
  savingErr: any = null;
 
   constructor(private activatedRoute: ActivatedRoute,
     private router: Router,private clientService:ClientService) {
 
    }
  ngOnInit() {
  }


  onLogin(dataForm){  
   
    this.clientService.logIn(dataForm.mail ,btoa( dataForm.mdp)).subscribe(response => {
      if (response.err) {
        this.savingErr = response.err;
        //TODO : afficher le msg d'erreur
      } else {
        this.currentClient = response.client ;
        sessionStorage.setItem("currentUser" ,JSON.stringify(this.currentClient));
        this.router.navigate(['/recherche', {currentClient : this.currentClient  }]);
      }
    });
  }
}
