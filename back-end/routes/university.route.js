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

router.post("/", roleAuth(["admin"]), create);

router.get("/", auth, roleAuth(["admin"]), getUniversities);
router.get("/:id", roleAuth(["admin"]), getUniversityById);
router.patch("/:id", roleAuth(["admin", "responsable"]), updateUniversity);
router.delete("/:id", roleAuth(["admin"]), deleteUniversity);

export default router;
