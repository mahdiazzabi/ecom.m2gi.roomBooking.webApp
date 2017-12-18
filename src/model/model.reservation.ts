import { Client } from "./model.client";
import { Logement } from "./model.logement";


export class Reservation {
    id_reservation?:number;
    date_Debut: Date;
    date_Fin: Date;
    prix_duree: number;
    client?:Client;
    logement?: Logement;
    }
