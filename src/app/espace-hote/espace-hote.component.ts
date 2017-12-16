import { Component, OnInit } from '@angular/core';
import { LogementsServices } from '../../services/logements.service';

@Component({
  selector: 'app-espace-hote',
  templateUrl: './espace-hote.component.html',
  styleUrls: ['./espace-hote.component.css']
})
export class EspaceHoteComponent implements OnInit {

  listLogement: Array<any> = null;

  constructor(private logementService : LogementsServices) { }

  ngOnInit() {
    this.doGetMyLogements();
  }
  
  doGetMyLogements(){
    this.logementService.getLogementsByClientHote(JSON.parse(sessionStorage.getItem("currentUser")).id_client);
  };
}
