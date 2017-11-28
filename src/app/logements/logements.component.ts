import { Component, OnInit } from '@angular/core';
import {ProposerLogementServices} from "../../services/Proposerlogement.service";
import {Http} from "@angular/http";

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

  constructor(public http:Http, public logementsdervice:ProposerLogementServices) { }

  ngOnInit() {
   this.doGet();

  }

  doGet(){
    this.logementsdervice.getLogements(this.currentpage,this.size)
      .subscribe(data=>{this.listLogement=data.logemens;
        this.nbrpages = new Array(data.total)
      },err=>{console.log(err);})
  }

  gotoPage(i:number){
    this.currentpage=i;
    this.doGet();

  }

}
