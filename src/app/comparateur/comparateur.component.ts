import { Component, OnInit } from '@angular/core';
import {Logement} from "../../model/model.logement";
import {Equipement} from "../../model/model.equipement";
import {Reservation} from "../../model/model.reservation";

@Component({
  selector: 'app-comparateur',
  templateUrl: './comparateur.component.html',
  styleUrls: ['./comparateur.component.css']
})
export class ComparateurComponent implements OnInit {
  log:Logement;
  equips:Equipement[]=[{"id_equip":1,"nom_equipement":"Produits de Base"},
    {"id_equip":2,"nom_equipement":"Wifi"},
    {"id_equip":3,"nom_equipement":"Télévision"},
    {"id_equip":4,"nom_equipement":"Chauffage"},
    {"id_equip":5,"nom_equipement":"Climatisation"}
    ];

  list_log:Logement[];


  constructor() {
   /* this.list_log = [{"titre":"Magnifique maison en bambou au bord du fleuve","ville":"Agadir","code_postal":"ffefef","adresse":"rue01","nbt_voyageurs":0,
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
        ]*/
  }

  ngOnInit() {
    //this.findid(8);
    this.get_logement()
  }

  get_logement():Logement[]
  {
    let tab_logs:Logement[]= JSON.parse(localStorage.getItem("Comparateur_array_logs"));
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
    localStorage.setItem("Comparateur_array_logs",JSON.stringify(liste_logs));
  }


  AddToCart(log:Logement) {
      let rechrche: any = JSON.parse(localStorage.getItem("CurentRecherche"));
    /*  console.log("recherche",rechrche);
    if (localStorage.getItem("CurentRecherche") != null) {*/

      let duree: number = Date.parse(rechrche.dateFin) - Date.parse(rechrche.dateDebut);

      duree = (duree) / (3600 * 24 * 1000);

      console.log("duree", duree);
      let res: Reservation = new Reservation()
      res.logement = log;
      res.date_Debut = rechrche.dateDebut;
      res.date_Fin = rechrche.dateFin;
      res.prix_duree = duree * log.prix;
      res.client = JSON.parse(sessionStorage.getItem("currentUser"));

      let tab_reservations: Reservation[] = JSON.parse(localStorage.getItem("panier_array_logs"));

      if (tab_reservations) {

        if (tab_reservations.find(x => x.logement.id_logement == log.id_logement)) {
          alert("Vous avez déja ajouter ce logement à votre panier!");
        }
        else {
          tab_reservations.push(res);

          localStorage.setItem("panier_array_logs", JSON.stringify(tab_reservations));
        }
      } else {
        let tab_reservations: Reservation[] = [res];
        localStorage.setItem("panier_array_logs", JSON.stringify(tab_reservations));
      }
/*    }
  else
      {
        alert("Vous n'avez pas spécifer la durée");
      }*/
  }
}

