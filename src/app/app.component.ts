import { Component, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Observable } from 'rxjs/Observable';
import { Client } from '../model/model.client';
import { Router} from '@angular/router';
import {Logement} from "../model/model.logement";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private isLoggedIn ;
  private loginSub;
  private userSub;
  private currentClient : Client ;

  title = 'app';
  constructor(private clientService : ClientService, private router: Router){
    console.log("constructeur");
    
    this.currentClient = new Client();
    this.currentClient = JSON.parse( sessionStorage.getItem("currentUser")) ;
    if (this.currentClient != null) {
      console.log(this.currentClient);
      this.isLoggedIn = true ;
    } else {
      console.log(this.currentClient); 
      this.isLoggedIn = false ;
    } 
  }

  ngOnChanges(changes: SimpleChanges ) {
      this.currentClient = JSON.parse( sessionStorage.getItem("currentUser")) ;
   }

  ngOnInit() {
    console.log("Init");
    
    this.loginSub = this.clientService.isLoggedIn.subscribe(val => {
       this.isLoggedIn = val;
    });

    this.userSub = this.clientService.currentClientLogged.subscribe(val => {
      this.currentClient = val;
    });

    this.currentClient = JSON.parse( sessionStorage.getItem("currentUser")) ;
    if (this.currentClient != null) {
      console.log(this.currentClient);
      this.isLoggedIn = true ;
    } else {
      console.log(this.currentClient); 
      this.isLoggedIn = false ;
    }  
  }



  logOut(){
    sessionStorage.clear();
    localStorage.clear();
    this.clientService.logOut() ;
    this.router.navigate(['/recherche']);
  }

  get_total_element_panier():number{
    let liste_logs:Logement[]= JSON.parse(localStorage.getItem("panier_array_logs"));
      if (liste_logs)
      {
        return liste_logs.length;
      }else{
        return 0;
      }
  }

  get_total_element_Comparateur():number{
    let liste_logs:Logement[]= JSON.parse(localStorage.getItem("Comparateur_array_logs"));
   if (liste_logs)
    {
      return liste_logs.length;
    }else{
      return 0;
    }
  }

}
