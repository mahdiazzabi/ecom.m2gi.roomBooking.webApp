import { Component, OnInit } from '@angular/core';
import {Logement} from "../../model/model.logement";
import {Equipement} from "../../model/model.equipement";

@Component({
  selector: 'app-comparateur',
  templateUrl: './comparateur.component.html',
  styleUrls: ['./comparateur.component.css']
})
export class ComparateurComponent implements OnInit {
  log:Logement;
  equips:Equipement[]=[{"id_equipement":1,"titre":"WIFI"},
    {"id_equipement":2,"titre":"Produits de Base"},
    {"id_equipement":3,"titre":"Télévision"},
    {"id_equipement":4,"titre":"Climatisation"},
    {"id_equipement":5,"titre":"Chaufage"}
    ];

  list_log:Logement[];


  constructor() {
/*    this.log = {"titre":"Magnifique maison en bambou au bord du fleuve","ville":"Agadir","code_postal":"ffefef","adresse":"rue01","nbt_voyageurs":0,
      "nbr_chamber":54,
      "nbr_salle_bain":5,
      "prix":25,
      "description":"gjyjhg",
      "client":null,
      "equipements":this.equips}*/

    this.list_log = [{"titre":"Magnifique maison en bambou au bord du fleuve","ville":"Agadir","code_postal":"ffefef","adresse":"rue01","nbt_voyageurs":0,
      "nbr_chamber":54,
      "nbr_salle_bain":5,
      "prix":25,
      "description":"ssssss",
      "client":null,
      "equipements":this.equips},

      {"titre":"Magnifique maison en bambou au bord du fleuve","ville":"CASA","code_postal":"ffefef","adresse":"rue01","nbt_voyageurs":0,
        "nbr_chamber":54,
        "nbr_salle_bain":5,
        "prix":25,
        "description":"ddddd",
        "client":null,
        "equipements":this.equips},

      {"titre":"Magnifique maison en bambou au bord du fleuve","ville":"Grenoble","code_postal":"ffefef","adresse":"rue01","nbt_voyageurs":0,
        "nbr_chamber":54,
        "nbr_salle_bain":5,
        "prix":25,
        "description":"ffff",
        "client":null,
        "equipements":this.equips},
      {"titre":"Magnifique maison en bambou au bord du fleuve","ville":"Grenoble","code_postal":"ffefef","adresse":"rue01","nbt_voyageurs":0,
        "nbr_chamber":54,
        "nbr_salle_bain":5,
        "prix":25,
        "description":"ffff",
        "client":null,
        "equipements":this.equips}
        ]
  }

  findid(id_params : number, equi:Equipement[]):boolean
  {
  let res:any;
    res = equi.find(x => x.id_equipement == id_params);
    if (res){
      return true;
    }else{
      return false;
    }
  }

  ngOnInit() {
    //this.findid(8);
  }

}
