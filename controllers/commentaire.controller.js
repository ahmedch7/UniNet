import Commentaire from "../models/commentaire.js";
import { validationResult } from "express-validator";

// Create Commentaire
export const createCommentaire = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const commentaire = new Commentaire(req.body);
    await commentaire.save();
    res.status(201).json(commentaire);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Commentaires
export const getCommentaires = async (req, res) => {
  try {
    const commentaires = await Commentaire.find();
    res.status(200).json(commentaires);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single Commentaire
export const getCommentaireById = async (req, res) => {
  try {
    const commentaire = await Commentaire.findById(req.params.id);
    if (!commentaire)
      return res.status(404).json({ message: "Commentaire not found" });
    res.status(200).json(commentaire);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Commentaire
export const updateCommentaire = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const commentaire = await Commentaire.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!commentaire)
      return res.status(404).json({ message: "Commentaire not found" });
    res.status(200).json(commentaire);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Commentaire
export const deleteCommentaire = async (req, res) => {
  try {
    const commentaire = await Commentaire.findByIdAndDelete(req.params.id);
    if (!commentaire)
      return res.status(404).json({ message: "Commentaire not found" });
    res.status(200).json({ message: "Commentaire deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// like commentaire

export const likeCommentaire = async (req, res, next) => {
  const {commentaireId} = req.params;
  const {userId} = req.body;
  try {
      const commentaire = await Commentaire.findById(commentaireId);
      if (!commentaire) {
          throw new CustomError("Commentaire non trouvé!", 404);
      }

      if (commentaire.likes.includes(userId)) {
          throw new CustomError("Vous avez déjà aimé ce commentaire", 400);
      }

      commentaire.likes.push(userId);
      await commentaire.save();

      res.status(200).json({message: "Commentaire aimé avec succès!", commentaire});
  } catch (error) {
      next(error);
  }
};

// Dislike commentaire
export const dislikecommentaire = async (req, res, next) => {
    const {commentaireId} = req.params;
    const {userId} = req.body;
    try {
        const commentaire = await Commentaire.findById(commentaireId);
        if (!commentaire) {
            throw new CustomError("Commentaire non trouvé!", 404);
        }

        if (!commentaire.likes.includes(userId)) {
            throw new CustomError("Vous n'avez pas aimé ce commentaire", 400);
        }

        commentaire.likes = commentaire.likes.filter(id => id.toString() !== userId);
        await commentaire.save();

        res.status(200).json({message: "Commentaire détesté avec succès!", commentaire});
    } catch (error) {
        next(error);
    }
}



