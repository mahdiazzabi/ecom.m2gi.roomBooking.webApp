import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../services/login.service';
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
  private currentUser : Client ;

  title = 'app';
  constructor(private loginService : LoginService){

  }

  ngOnInit() {
    this.loginSub = this.loginService.isLoggedIn.subscribe(val => {
      this.isLoggedIn = val;
    });;
    if (typeof(Storage) !== 'undefined'){
      this.currentUser = JSON.parse( sessionStorage.getItem("currrentUser")) ;
    }
  }
 
  ngOnDestroy() {
    this.loginSub.unsubscribe();
  }

  logOut(){
    this.loginService.logOut() ;
    
  }

}
