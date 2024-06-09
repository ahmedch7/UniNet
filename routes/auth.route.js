import {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  validateAccount,
  sendValidationEmail,
  verifyToken,
  signout,
} from "../controllers/auth.controller.js";
import checkTokenBlacklist from "../middlewares/checkTokenBlacklist.js";
import { validateUser } from "../middlewares/userValidator.js";
import { handleValidationErrors } from "../middlewares/validationMiddleware.js";
import { Router } from "express";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", checkTokenBlacklist, signout);
router.post("/forgot-password", forgotPassword);
router.get("/reset-password/:token", verifyToken);
router.post("/reset-password/:token", resetPassword);
router.post("/send-validation-email", sendValidationEmail);
router.post("/validate-account", validateAccount);

export default router;
