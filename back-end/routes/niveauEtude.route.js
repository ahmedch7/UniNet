import { Router } from "express";
import { createNiveau, getNiveau, getNiveauById, updateNiveauEdu, deleteNivEdu} from "../controllers/niveauEducatif.controllers.js";

const router = Router();

router.post("/create", createNiveau)

router.get("/get", getNiveau )

router.get("/:id", getNiveauById)

router.patch("/:id", updateNiveauEdu)

router.delete("/:id", deleteNivEdu)


export default router;
