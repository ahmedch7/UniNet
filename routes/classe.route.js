import { Router } from "express";
import { createClasse, getClasse, getClasseById, updateClasse, deleteClasse, getClassesByNiveau  } from "../controllers/classe.controllers.js";

const router = Router();

router.post("/create", createClasse)

router.get("/get", getClasse )

router.get("/:id", getClasseById)

router.get("/classes/:id", getClassesByNiveau)

router.patch("/:id", updateClasse)

router.delete("/:id", deleteClasse)

export default router;
