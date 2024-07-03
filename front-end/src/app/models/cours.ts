import { Classe } from "./classe";

export class Cours{
    _id!: string;
    NomCours:string
    Description:string
    Datepub:Date
    files:string
    classe: Classe[]=[];
}