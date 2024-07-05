import { Router } from "express";
import { body } from "express-validator";
import multer from "multer";
import {
  createForum,
  getForums,
  getForumById,
  updateForum,
  deleteForum,
  getForumsByCategory,
} from "../controllers/forum.controller.js";

import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
const router = Router();

// Create Forum
router.post(
  "/",
  upload.single("cv_path"), // Use the middleware to handle file upload
  [
    body("titreForum")
      .isString()
      .matches(/^[a-zA-ZÀ-ÿ0-9\- ]+$/)
      .withMessage("Invalid value for titreForum"),
    body("userId").isMongoId().withMessage("Invalid value for userId"),
  ],
  createForum
);

// Get all Forums
router.get("/", getForums);

// Get single Forum
router.get("/:id", getForumById);

// Update Forum
router.put(
  "/:id",
  [body("titreForum").isString().notEmpty(), body("userId").isMongoId()],
  updateForum
);

// Delete Forum
router.delete("/:id", deleteForum);

// Get forums by category
router.get("/category/:category", getForumsByCategory);

export default router;
