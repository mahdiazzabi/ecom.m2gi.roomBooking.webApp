import { Component, OnInit } from '@angular/core';
import {Logement} from "../../model/model.logement";

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.get_logement();
  }


  get_logement():Logement[]
  {
      let tab_logs:Logement[]= JSON.parse(localStorage.getItem("panier_array_logs"));

      //console.log(tab_logs);
      return tab_logs;
  }

  get_total_element():number{
    let liste_logs:Logement[]= JSON.parse(localStorage.getItem("panier_array_logs"));
    return liste_logs.length;
  }
  get_total():number{
      let liste_logs:Logement[]=this.get_logement();
      let somme:number=0;
      if (liste_logs){
        for (var i = 0; i < liste_logs.length; i++) {
          somme += liste_logs[i].prix;
        }
        return somme;
      }else {
        return 0;
      }
  }

  delete_logement(i:number){
     let liste_logs:Logement[]=this.get_logement();
     liste_logs.splice(i,1);
    localStorage.setItem("panier_array_logs",JSON.stringify(liste_logs));
  }




}
