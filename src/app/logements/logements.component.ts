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


  @Input('getSearchStatus') getSearchStatus: Boolean;
  @Output() getSearchStatusChange = new EventEmitter<boolean>();


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
            this.getSearchStatus = true ;   
          },err=>{console.log(err);})
      }

  doGetLogementsByVilleDateFromDateTo(){
    
            this.logementsdervice.getLogementsByRecherche(this.currentpage,this.size,this.recherche)
              .subscribe(data=>{
                this.listLogement=data.logemens;
                this.nbrpages = new Array(data.total);
                this.getSearchStatus = true ;  
                //to notify parent recherche-result 
                this.getSearchStatusChange.emit(true);
              },err=>{
                console.log(err);
                this.getSearchStatus = false ;  
                //to notify parent recherche-result 
                this.getSearchStatusChange.emit(false);
              })
          }

  gotoPage(i:number){
    this.currentpage=i;
    this.doGetAllLogements();

  }

}
