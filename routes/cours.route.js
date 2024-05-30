import { Router } from "express";
import { createCours, getCours, getCoursById, updateCours, deleteCours, getCoursesByClasse } from "../controllers/cours.controllers.js";

const router = Router();

router.post("/create", createCours)

router.get("/get", getCours )

router.get("/:id", getCoursById)

router.get("/courses/classe/:id", getCoursesByClasse)

router.patch("/:id", updateCours)

router.delete("/:id", deleteCours)

export default router;