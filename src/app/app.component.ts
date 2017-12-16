import { Component, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Observable } from 'rxjs/Observable';
import { Client } from '../model/model.client';
import { Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnDestroy{
  
  private isLoggedIn = false;
  private loginSub;
  private userSub;
  private currentClient : Client ;

  title = 'app';
  constructor(private clientService : ClientService, private router: Router){
    this.currentClient = new Client();
    
  }

  ngOnChanges(changes: SimpleChanges ) {
      this.currentClient = JSON.parse( sessionStorage.getItem("currentUser")) ;
   }

  ngOnInit() {
    this.loginSub = this.clientService.isLoggedIn.subscribe(val => {
      this.isLoggedIn = val;
    }); 

    this.userSub = this.clientService.currentClientLogged.subscribe(val => {
      this.currentClient = val;
    });
      
  }
 
  ngOnDestroy() {
    this.loginSub.unsubscribe();
  }

  logOut(){
    sessionStorage.clear();
    this.clientService.logOut() ;
    this.router.navigate(['/recherche']);
  }

}
