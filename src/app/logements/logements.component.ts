import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import { LogementsServices } from '../../services/logements.service';

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

  constructor(public http:Http, public logementsdervice:LogementsServices) { }

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
