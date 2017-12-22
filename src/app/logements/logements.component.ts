
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
  ListAllLogements: Array<any> = null;
  currentpage:number=0;
  size:number=8;
  nbrpages:Array<number>;
  currentLogement:Logement;

  @Input('mainPage') mainPage:boolean;

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
    if (this.mainPage) {

      this.doGetAllLogements();
    } else {
      this.doGetLogementsByVilleDateFromDateTo();
    }
     // this.DoGetAllLogements();

  }


  doGetLogementsByVilleDateFromDateTo(){

            this.logementsService.getLogementsByRecherche(this.currentpage,this.size,this.recherche)
              .subscribe(data=>{
                this.listLogement=data.logemens;
                this.nbrpages = new Array(data.total);
                //to notify parent recherche-result
                if (this.listLogement.length > 0) {
                     localStorage.setItem('CurentRecherche', JSON.stringify(this.recherche));
                  this.resultResearch= data.totalLogement +" Logements ont été à " + this.recherche.villeRecherche
                }else{
                  this.resultResearch= "Aucun résultat trouvé"
                }
              },err=>{
                console.log(err);
                //to notify parent recherche-result
              })
          }

 doGetAllLogements(){
    this.logementsService.getLogements(this.currentpage,this.size)
      .subscribe(data=>{
        this.listLogement=data.logemens;
        //to notify parent recherche-result

        this.resultResearch= "Tous nos logements"
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

  AddToComparateur(log:Logement){
    let tab_logs:Logement[]= JSON.parse(localStorage.getItem("Comparateur_array_logs"));
    if (tab_logs){
      if (tab_logs.find(x => x.id_logement == log.id_logement)){
        alert("Vous avez déja ajouter ce logement au Comparateur!");
      }
      else
      {
        tab_logs.push(log);
        localStorage.setItem("Comparateur_array_logs",JSON.stringify(tab_logs));
      }
    }else {
      let tab_logs:Logement[] = [log] ;
      localStorage.setItem("Comparateur_array_logs",JSON.stringify(tab_logs));
    }
  }

}
