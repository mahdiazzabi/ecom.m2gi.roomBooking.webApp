import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
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
     private router: Router,private loginService:LoginService) {
 
    }
  ngOnInit() {
  }


  onLogin(dataForm){  
   
    this.loginService.logIn(dataForm.mail ,btoa( dataForm.mdp)).subscribe(response => {
      if (response.err) {
        this.savingErr = response.err;
        //TODO : afficher le msg d'erreur
      } else {
        this.currentClient = response.client ;
        this.router.navigate(['/recherche']);
      }
    });
  }
}
