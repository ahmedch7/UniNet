import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUsersByRole,
  getUsersByRoleAndUniversity
} from "../controllers/user.controller.js";
import auth from "../middlewares/auth.js";
import roleAuth from "../middlewares/roleAuth.js";
import checkTokenBlacklist from '../middlewares/checkTokenBlacklist.js';

const router = Router();

router.get("/", auth,checkTokenBlacklist, roleAuth(["admin"]), getUsers);
router.get("/:id", auth, getUserById);
router.get('/role/:role',auth,roleAuth(["admin", "responsable"]), getUsersByRole);
router.get('/role/:role/:universityId/:niveauxEducatif',auth,roleAuth(["admin", "etudiant"]), getUsersByRoleAndUniversity);
router.patch("/:id", auth, updateUser);
router.delete("/:id", auth, roleAuth(["admin", "responsable"]), deleteUser);
export default router;
