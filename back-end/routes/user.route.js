import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUsersByRole,
  getUsersByRoleAndUniversity,
  changeUserStatus
} from "../controllers/user.controller.js";
import auth from "../middlewares/auth.js";
import roleAuth from "../middlewares/roleAuth.js";
import checkTokenBlacklist from '../middlewares/checkTokenBlacklist.js';
import multer, {diskStorage} from "multer";
import path from "path";


const router = Router();
const upload = multer({
  storage : diskStorage({
      destination : (req, file, cb) => {
          cb(null, "public/images", )
      },
      filename : (req, file, cb ) => {
          const name = file.originalname.split(" ").join("_")
          const extension = path.extname(file.originalname);

          cb(null, name + Date.now() + extension)
      }
  }),
  limits : 512 * 1024 ,
}).single("avatar");

router.get("/", auth,checkTokenBlacklist, roleAuth(["admin"]), getUsers);
router.get("/:id", auth, getUserById);
router.get('/role/:role',auth,roleAuth(["admin", "responsable"]), getUsersByRole);
router.get('/role/:role/:universityId/:niveauxEducatif',auth,roleAuth(["admin", "etudiant"]), getUsersByRoleAndUniversity);
router.patch("/:id", auth,upload, updateUser);
router.patch("/status/:id", auth, roleAuth(["admin", "responsable"]), changeUserStatus); // New route for changing user status
router.delete("/:id", auth, roleAuth(["admin", "responsable"]), deleteUser);
export default router;
