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
<<<<<<< HEAD
router.get("/getByPostId", getCommentByPostId);
=======
router.get("/getByPostId/:postId", getCommentByPostId);
>>>>>>> d05f7e52ac0a5feeb570803df29a245142325854

export default router;
