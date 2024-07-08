// examen.model.ts

import { Salle } from "./salles"; 

export interface Examen {
    _id: string; // Peut-être nécessaire pour l'identification dans votre application Angular
    title: string;
    description: string;
    date: Date;
    duration: number; // Durée en minutes
    salle?: Salle ; // Peut être un ID de salle ou un objet Salle complet si vous le chargez
    classe: string;
    module: string;
    heureDebut: Date;
    heureFin: Date;
    typeSession: 'principale' | 'rattrapage';
  }
  