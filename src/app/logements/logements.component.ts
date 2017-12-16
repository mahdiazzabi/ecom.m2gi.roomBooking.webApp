
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
  size:number=8;
  nbrpages:Array<number>;
  currentLogement:Logement;

  @Input('mode') mode:number;

  resultResearch: String ;

  @Input('recherche') recherche: Recherche;


  constructor(public http:Http, public logementsService:LogementsServices) { 
    this.nbrpages= new Array(0);
    
  }
  
  ngOnChanges(changes: SimpleChanges) {
   
    this.mode = 0;
    this.doGetLogementsByVilleDateFromDateTo();
    
  } 

  ngOnInit() {
      this.doGetLogementsByVilleDateFromDateTo();

  }

  doGetLogementsByVilleDateFromDateTo(){
    
            this.logementsService.getLogementsByRecherche(this.currentpage,this.size,this.recherche)
              .subscribe(data=>{
                this.listLogement=data.logemens;
                this.nbrpages = new Array(data.total);
                //to notify parent recherche-result 
                if (this.listLogement.length > 0) {
                  this.resultResearch= data.totalLogement +" logements ont était trouvé à " + this.recherche.villeRecherche
                }else{
                  this.resultResearch= "Aucun résultat trouvé"
                }
              },err=>{
                console.log(err);
                //to notify parent recherche-result 
              })
          }



  gotoPage(i:number){
    this.currentpage=i;
    this.doGetLogementsByVilleDateFromDateTo();

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
