import { Router } from "express";
import {
  create,
  getUniversityById,
  getUniversities,
  updateUniversity,
  deleteUniversity,
} from "../controllers/university.controller.js";
import { body } from "express-validator";
import roleAuth from "../middlewares/roleAuth.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.post("/",  create);

router.get("/",  getUniversities);
router.get("/:id",auth, roleAuth(["admin"]), getUniversityById);
router.patch("/:id",auth, roleAuth(["admin", "responsable"]), updateUniversity);
router.delete("/:id",auth, roleAuth(["admin"]), deleteUniversity);

export default router;
