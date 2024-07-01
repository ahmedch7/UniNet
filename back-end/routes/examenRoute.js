import Salle from "../models/salle.js";
import express from "express";

import {
  createExamen,
  updateExamen,
  deleteExamen,
  getExamenById,
  getAllExamens,
  affecterExamenSalle,
  getExamensBySalle,
 
} from "../controllers/examenController.js";

const router = express.Router();

// Routes pour les examens
router.post("/create", createExamen); // Créer un nouvel examen
router.put("/update/:id", updateExamen); // Mettre à jour un examen existant
router.delete("/dele/:id", deleteExamen); // Supprimer un examen
router.get("/allID/:id", getExamenById); // Rechercher un examen par ID
router.get("/all", getAllExamens); // Afficher tous les examens
router.post("/affecter/:salleId", affecterExamenSalle); // Affecter un examen à une salle à une date choisie
router.get('/salle/:salleId', getExamensBySalle);

export default router;
