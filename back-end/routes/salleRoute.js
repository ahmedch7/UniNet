import express from "express";
import {
  createSalle,
  updateSalle,
  deleteSalle,
  getSalleById,
  getSalleByName,
  getAllSalles,
  getSallesDisponibles,
  affecterExamenExistanteSalle,
  getAvailableSalles
} from "../controllers/salleController.js";

const router = express.Router();

// Routes pour les salles
router.post("/create", createSalle); // Créer une nouvelle salle
router.put("/update/:id", updateSalle); // Mettre à jour une salle existante
router.delete("/delete/:id", deleteSalle); // Supprimer une salle
router.get("/allid/:id", getSalleById); // Rechercher une salle par ID
router.get("/all/name/:name", getSalleByName); // Rechercher une salle par nom
router.get("/all", getAllSalles); // Afficher toutes les salles
router.get("/disponibles", getSallesDisponibles); // Afficher les salles disponibles à une date donnée
router.post('/affecter-existant', affecterExamenExistanteSalle);
router.post('/salles/disponibles', getAvailableSalles);

export default router;
