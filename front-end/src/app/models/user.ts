import { University } from "./university";

export class User {
  _id!: string;
  avatar!: string;
  nom!: string;
  prenom!: string;
  email!: string;
  motDePasse!: string;
  dateDeNaissance!: Date;
  numTel!: string;
  role!: string;
  universiteAssociee?: University;
  entreprise!: string;
  niveauxEducatif!: string;
  twoFactorEnabled: boolean = false;
  twoFactorSecret?: string;
  activeStatus!: boolean; 
  dateInscription!: Date;  
  derniereConnexion?: Date;
}
