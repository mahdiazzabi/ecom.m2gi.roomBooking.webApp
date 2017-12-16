import { Client } from "./model.client";
import {Equipement} from "./model.equipement";

export class Logement {
    id_logement?:number;
    image?:string;
    titre:String;
    nbt_voyageurs:number;
    nbr_chamber:number;
    nbr_salle_bain:number;
    ville:String ="" ;
    code_postal:String ="" ;
    adresse:String ="" ;
    prix:number ;
    description:String ="" ;
    client:Client;
    equipements?:Equipement[];
    }
