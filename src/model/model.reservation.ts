import { Client } from "./model.client";
import { Logement } from "./model.logement";


export class Reservation {
    id_reservation?:number;
    dateDebut: Date;
    dateFin: Date;
    prix: number;
    client?:Client;
    logement?: Logement;
    }
