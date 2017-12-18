import { Client } from "./model.client";
import { Logement } from "./model.logement";


export class Reservation {
    id_reservation?:number;
    date: Date;
    duree: number;
    client?:Client;
    logement?: Logement;
    }
