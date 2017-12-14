import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Observable } from 'rxjs/Observable';
import { Client } from '../model/model.client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnDestroy{
  
  private isLoggedIn = false;
  private loginSub;
  private currentClient : Client ;

  title = 'app';
  constructor(private clientService : ClientService){
    this.currentClient = JSON.parse( sessionStorage.getItem("currentUser")) ;
    
  }

  ngOnInit() {
    this.loginSub = this.clientService.isLoggedIn.subscribe(val => {
      this.isLoggedIn = val;
    });
      this.currentClient = JSON.parse( sessionStorage.getItem("currentUser")) ;
    
  }
 
  ngOnDestroy() {
    this.loginSub.unsubscribe();
  }

  logOut(){
    sessionStorage.clear();
    this.clientService.logOut() ;
    
  }

}
