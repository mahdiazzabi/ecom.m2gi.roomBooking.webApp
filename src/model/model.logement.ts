import { Client } from "./model.client";

export class Logement {
    id_logement?:number;
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
    }