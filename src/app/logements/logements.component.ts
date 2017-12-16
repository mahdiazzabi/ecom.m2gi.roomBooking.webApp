import { Component, OnInit } from '@angular/core';
import {LogementsServices} from "../../services/logements.service";
import {Http} from "@angular/http";
import { Logement } from '../../model/model.logement';
import { Router } from '@angular/router';

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

  constructor(public http:Http, public logementsdervice:LogementsServices, public router:Router) { }

  ngOnInit() {
   this.doGet();
  // this.mode=0;
  //this.getValueMode(0);

  }

  doGet(){
    this.logementsdervice.getLogements(this.currentpage,this.size)
      .subscribe(data=>{this.listLogement=data.logemens;
        this.nbrpages = new Array(data.total);
        this.mode=0
      },err=>{console.log(err);})
  }



  gotoPage(i:number){
    this.currentpage=i;
    this.doGet();

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
