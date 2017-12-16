
import { Logement } from '../../model/model.logement';
import { Router } from '@angular/router';
import { Component, OnInit ,Input, SimpleChanges, SimpleChange, Output, EventEmitter} from '@angular/core';
import {Http} from "@angular/http";
import { LogementsServices } from '../../services/logements.service';
import { Recherche } from '../../utils/utils.recherche';

@Component({
  selector: 'app-logements',
  templateUrl: './logements.component.html',
  styleUrls: ['./logements.component.css']
})
export class LogementsComponent implements OnInit {
  listLogement: Array<any> = null;
  currentpage:number=0;
  size:number=4;
  nbrpages:Array<number>;
  currentLogement:Logement;
  mode:number;

  @Input('recherche') recherche: Recherche;
  @Input('fromRecherche') fromRecherche: Boolean;


  @Output() getSearchStatus = new EventEmitter<Boolean>();


  constructor(public http:Http, public logementsService:LogementsServices) { 
    this.nbrpages= new Array(0);
    this.mode = 0
  }
  
  ngOnChanges(changes: SimpleChanges) {
   if (this.fromRecherche) {
    this.doGetLogementsByVilleDateFromDateTo();

  } else {
    
    this.doGetAllLogements();
    //from espace-hote getLogementByClient...
  }
  } 
  ngOnInit() {
    if (this.fromRecherche) {
      this.doGetLogementsByVilleDateFromDateTo();

    } else {
      
      this.doGetAllLogements();
      //from espace-hote getLogementByClient...
    }

  }

  doGetAllLogements(){
    
        this.logementsService.getLogements(this.currentpage,this.size)
          .subscribe(data=>{this.listLogement=data.logemens;
            this.nbrpages = new Array(data.total);
          },err=>{console.log(err);})
      }

  doGetLogementsByVilleDateFromDateTo(){
    
            this.logementsService.getLogementsByRecherche(this.currentpage,this.size,this.recherche)
              .subscribe(data=>{
                this.listLogement=data.logemens;
                this.nbrpages = new Array(data.total);
                //to notify parent recherche-result 
                if (this.listLogement.length > 0) {
                  
                this.getSearchStatus.emit(true);
                }else{
                  
                this.getSearchStatus.emit(false);
                }
              },err=>{
                console.log(err);
                //to notify parent recherche-result 
              })
          }



  gotoPage(i:number){
    this.currentpage=i;
    this.doGetAllLogements();

  }

  getLogement(logement:Logement,m:number){
    console.log(logement);
    this.currentLogement=logement;
    this.mode=m;
    //this.router.navigate(['detailsLogement',mode]);

  }

  getValueMode(m : number){
       this.mode=m;
    // console.log(this.mode);
  }

}
