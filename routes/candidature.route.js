import { Router } from "express";
import { body } from "express-validator";
import multer from "multer";
import path from "path";

import {
  createCandidature,
  getCandidate,
  getCandidateById,
  updateCAndidate,
  deleteCandidate,
} from "../controllers/candidature.controller.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
const router = Router();

// Create Candidature
router.post(
  "/",
  upload.single("cv"), // Use the middleware to handle file upload
  [
    body("userName")
      .isString()
      .isLength({ min: 3, max: 100 })
      .withMessage("userName must be between 3 and 100 characters"),
    body("phoneNumber").isString().withMessage("phoneNumber is required"),
    body("postId").isMongoId().withMessage("Invalid value for postId"),
  ],
  createCandidature
);

// Get all Candidatures
router.get("/", getCandidate);

// Get single Candidature
router.get("/:id", getCandidateById);

// Update Candidature
router.put(
  "/:id",
  [
    body("userName")
      .isString()
      .isLength({ min: 3, max: 100 })
      .withMessage("userName must be between 3 and 100 characters"),
    body("phoneNumber").isString().withMessage("phoneNumber is required"),
    body("postId").isMongoId().withMessage("Invalid value for postId"),
  ],
  updateCAndidate
);

// Delete Candidature
router.delete("/:id", deleteCandidate);

export default router;
