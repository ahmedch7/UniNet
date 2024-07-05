import Commentaire from "../models/commentaire.js";
import { validationResult } from "express-validator";
import Filter from "bad-words";
const filter = new Filter();
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import { getPostById } from "./post.controller.js";
// Create Commentaire
export const createCommentaire = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let { contenuCommentaire } = req.body;
    console.log("Original content:", contenuCommentaire);

    // Ensure contenuCommentaire is defined and is a string
    if (typeof contenuCommentaire !== "string") {
      return res.status(400).json({ message: "Content must be a string" });
    }

    // Clean the content and check for bad words
    contenuCommentaire = filter.clean(contenuCommentaire);
    console.log("Cleaned content:", contenuCommentaire);

    if (filter.isProfane(contenuCommentaire)) {
      contenuCommentaire = filter.clean(contenuCommentaire);
      console.log("Content after removing bad words:", contenuCommentaire); // This replaces bad words with asterisks
    } else {
      console.log("No bad words detected");
    }

    const commentaire = new Commentaire({ ...req.body, contenuCommentaire });
    console.log("Commentaire:", commentaire);
    await commentaire.save();
    res.status(201).json(commentaire);
  } catch (error) {
    console.error("Error creating comment:", error);
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
  const { commentaireId } = req.params;
  const { userId } = req.body;
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

    res
      .status(200)
      .json({ message: "Commentaire aimé avec succès!", commentaire });
  } catch (error) {
    next(error);
  }
};

// Dislike commentaire
export const dislikecommentaire = async (req, res, next) => {
  const { commentaireId } = req.params;
  const { userId } = req.body;
  try {
    const commentaire = await Commentaire.findById(commentaireId);
    if (!commentaire) {
      throw new CustomError("Commentaire non trouvé!", 404);
    }

    if (!commentaire.likes.includes(userId)) {
      throw new CustomError("Vous n'avez pas aimé ce commentaire", 400);
    }

    commentaire.likes = commentaire.likes.filter(
      (id) => id.toString() !== userId
    );
    await commentaire.save();

    res
      .status(200)
      .json({ message: "Commentaire détesté avec succès!", commentaire });
  } catch (error) {
    next(error);
  }
};

export const getCommentByPostId = async (req, res) => {
  const { postId } = req.query;
  console.log("Post ID received:", postId);

  if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
    console.log("Invalid postId format");
    return res.status(400).json({ message: "Invalid postId format" });
  }

  try {
    const postObjectId = mongoose.Types.ObjectId(postId);
    console.log("Converted postId to ObjectId:", postObjectId);
    const commentaires = await Commentaire.find({ postId: postObjectId });
    console.log("Comments found:", commentaires);
    res.status(200).json(commentaires);
  } catch (error) {
    console.error("Error getting comments by post ID:", error);
    console.error(error.stack); // Log the full stack trace
    res.status(500).json({ message: "Internal Server Error" });
  }
};
