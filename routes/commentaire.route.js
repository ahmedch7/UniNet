import { Router } from "express";
import { body } from "express-validator";
import {
  createCommentaire,
  getCommentaires,
  getCommentaireById,
  updateCommentaire,
  deleteCommentaire,
  likeCommentaire,
  dislikecommentaire,
  getCommentByPostId,
} from "../controllers/commentaire.controller.js";

const router = Router();

// Create Commentaire
router.post(
  "/",
  [body("contenuCommentaire").isString().notEmpty()],
  createCommentaire
);

// Get all Commentaires
router.get("/", getCommentaires);

// Get single Commentaire
router.get("/:id", getCommentaireById);

// Update Commentaire
router.put(
  "/:id",
  [body("contenuCommentaire").isString().notEmpty()],
  updateCommentaire
);

// Delete Commentaire
router.delete("/:id", deleteCommentaire);

// Like Commentaire
router.post("/:commentaireId", likeCommentaire);

// Dislike Commentaire
router.post("/:commentaireId", dislikecommentaire);
router.get("/getByPostId", getCommentByPostId);

export default router;
