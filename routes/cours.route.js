import { Router } from "express";
import { body } from "express-validator";
import { createCours, getCours, getCoursById, updateCours, deleteCours } from "../controllers/cours.controllers.js";

const router = Router();

router.post("/", createCours)

router.get("/", getCours )

router.get("/:id", getCoursById)

router.patch("/:id", updateCours)

router.delete("/:id", deleteCours)

export default router;
