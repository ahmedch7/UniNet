import Salle from "../models/salle.js";
import express from "express";

import {
  createExamen,
  updateExamen,
  deleteExamen,
  getExamenById,
  getAllExamens,
  affecterExamenSalle,
  getExamensBySalleName,
  getExamensBySalle
 
} from "../controllers/examenController.js";

const router = express.Router();

// Routes pour les examens
router.post("/create", createExamen); // Créer un nouvel examen
router.patch("/update/:id", updateExamen); // Mettre à jour un examen existant
router.delete("/dele/:id", deleteExamen); // Supprimer un examen
router.get("/allID/:id", getExamenById); // Rechercher un examen par ID
router.get("/all", getAllExamens); // Afficher tous les examens

// Route pour affecter un examen à une salle
router.post('/examens/salles/affecter', affecterExamenSalle);

// Route pour récupérer les examens par nom de salle
router.get('/examens/salles', getExamensBySalleName);
router.get('/salle/:salleId', getExamensBySalle);

export default router;
