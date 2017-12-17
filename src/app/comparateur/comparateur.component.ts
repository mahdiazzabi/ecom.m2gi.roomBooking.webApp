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
  equips:Equipement[]=[{"id_equip":1,"nom_equipement":"WIFI"},
    {"id_equip":2,"nom_equipement":"Produits de Base"},
    {"id_equip":3,"nom_equipement":"Télévision"},
    {"id_equip":4,"nom_equipement":"Climatisation"},
    {"id_equip":5,"nom_equipement":"Chaufage"}
    ];

  list_log:Logement[];


  constructor() {
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

  ngOnInit() {
    //this.findid(8);
  }

  get_logement():Logement[]
  {
    let tab_logs:Logement[]= JSON.parse(localStorage.getItem("comparateur_array_logs"));
    return tab_logs;
  }

  findid(id_params : number, equi:Equipement[]):boolean
  {
  let res:any;
    res = equi.find(x => x.id_equip == id_params);
    if (res){
      return true;
    }else{
      return false;
    }
  }

  delete_logement(i:number)
  {
    let liste_logs:Logement[]=this.get_logement();
    liste_logs.splice(i,1);
    localStorage.setItem("comparateur_array_logs",JSON.stringify(liste_logs));
  }



}
