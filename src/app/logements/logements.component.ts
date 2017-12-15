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
  size:number=20;
  nbrpages:Array<number>;

  @Input('recherche') recherche: Recherche;
  @Input('fromRecherche') fromRecherche: Boolean;


  @Output() getSearchStatus = new EventEmitter<Boolean>();


  constructor(public http:Http, public logementsdervice:LogementsServices) { 
    this.nbrpages= new Array(0);
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
    
        this.logementsdervice.getLogements(this.currentpage,this.size)
          .subscribe(data=>{this.listLogement=data.logemens;
            this.nbrpages = new Array(data.total);
          },err=>{console.log(err);})
      }

  doGetLogementsByVilleDateFromDateTo(){
    
            this.logementsdervice.getLogementsByRecherche(this.currentpage,this.size,this.recherche)
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

}
