// salle.model.ts
import { Examen } from "./examens"; // Importez le modèle Examen s'il est déjà défini

export interface Salle {
  _id: string; // Peut-être nécessaire pour l'identification dans votre application Angular
  name: string;
  capacity: number;
  location: string;
  schedules: { examen: Examen }[]; // Tableau d'objets Examen ou d'IDs d'examen
}
