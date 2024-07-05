import { ChatMessage } from "./chatMessage";
import { User } from "./user";

export class Classe {
    _id!: string;
    NomClasse!: string;
    AnneUniversitaire!: string;
    NiveauEducatifId!: string;
    User: User[] = [];
    messages?: ChatMessage[]; // Add messages property

  constructor(data: any) {
    Object.assign(this, data);
  }

}