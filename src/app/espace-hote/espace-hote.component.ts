import { Component, OnInit } from '@angular/core';
import { LogementsServices } from '../../services/logements.service';
import { Router } from '@angular/router';
import { Logement } from '../../model/model.logement';

@Component({
  selector: 'app-espace-hote',
  templateUrl: './espace-hote.component.html',
  styleUrls: ['./espace-hote.component.css']
})
export class EspaceHoteComponent implements OnInit {

  listLogement: Array<any> = null;

  constructor(private logementService : LogementsServices , private router : Router) { }

  ngOnInit() {
    
    this.doGetMyLogements(JSON.parse(sessionStorage.getItem("currentUser")).id_client);
  }
  
  doGetMyLogements(id:number){
    this.logementService.getLogementsByClientHote(id).subscribe(data=>{
      console.log(data);
      this.listLogement=data;
      //to notify parent recherche-result 
    },err=>{
      console.log(err);
      //to notify parent recherche-result 
    });
  };

  manageDisponibilite(logement:Logement){
    localStorage.setItem('currentLogement',JSON.stringify(logement));
    this.router.navigate(['/disponibilite']);
    
  }
}
