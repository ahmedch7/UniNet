import { User } from "./user";

export class Classe {
    _id!: string;
    NomClasse!: string;
    AnneUniversitaire!: string;
    NiveauEducatifId!: string;
    User: User[] = [];

}