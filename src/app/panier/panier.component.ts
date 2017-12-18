import { Component, OnInit } from '@angular/core';
import {Logement} from "../../model/model.logement";
import {Reservation} from "../../model/model.reservation";

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


  get_logement():Reservation[]
  {
      let tab_res:Reservation[]= JSON.parse(localStorage.getItem("panier_array_logs"));

      //console.log(tab_logs);
      return tab_res;
  }

  get_total_element():number{
    let liste_logs:Reservation[]= JSON.parse(localStorage.getItem("panier_array_logs"));
    return liste_logs.length;
  }

  get_dure(debut:any,fin:any):number{

    let duree: number = Date.parse(fin) - Date.parse(debut);

  return (duree)/(3600*24*1000);
  }

  get_total():number{

      let liste_res:Reservation[]=this.get_logement();
      let somme:number=0;
      if (liste_res){
        for (var i = 0; i < liste_res.length; i++) {
          somme += liste_res[i].prix_duree;
        }
        return somme;
      }else {
        return 0;
      }
  }

  delete_logement(i:number){
     let liste_res:Reservation[]=this.get_logement();
    liste_res.splice(i,1);
    localStorage.setItem("panier_array_logs",JSON.stringify(liste_res));
  }




}
