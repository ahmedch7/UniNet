import { Router } from "express";
import { body } from "express-validator";
import { createClasse, getClasse, getClasseById, updateClasse, deleteClasse } from "../controllers/task.js";

const router = Router();

router.post("/", createClasse)

router.get("/", getClasse )

router.get("/:id", getClasseById)

router.patch("/:id", updateClasse)

router.delete("/:id", deleteClasse)

export default router;
