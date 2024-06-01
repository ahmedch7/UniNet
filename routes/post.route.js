import { Router } from "express";
import { body } from "express-validator";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  dislikePost,

} from "../controllers/publication.controller.js";
import upload from "../middlewares/upload.js";

const router = Router();

// Create Post
router.post(
  "/",
  [
    body("contenuPost").isString().notEmpty(),
    body("userId").isMongoId(),
  ],
  createPost
);

// Get all Posts
router.get("/", getPosts);

// Get single Post
router.get("/:id", getPostById);

// Update Post
router.put(
  "/:id",
  [
    body("contenuPost").isString().notEmpty(),
    body("userId").isMongoId(),
  ],
  updatePost
);

// Delete Post
router.delete("/:id", deletePost);

// Like Post
router.post("/:postId",likePost)

// Dislike Post
router.post("/:postId",dislikePost)



export default router;
