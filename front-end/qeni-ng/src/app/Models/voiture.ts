import { Client } from "./client";
import { Modele } from "./modele";

export interface Voiture{
    idDto:number;
    matriculeDto:string;
    kilometrageDto:number;
    numChassisDto:string;
    AnneeDto:Date;
    clientDto:Client;
    modeleDto:Modele;

}