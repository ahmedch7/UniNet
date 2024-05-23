import { Router } from "express";
import { create, getUniversityById, getUniversities, updateUniversity,deleteUniversity } from "../controllers/university.controller.js";
import { body } from "express-validator";

const router = Router();


router.post("/", create);

router.get("/", getUniversities)
router.get("/:id", getUniversityById)
router.patch("/:id", updateUniversity)
router.delete("/:id", deleteUniversity)


export default router;