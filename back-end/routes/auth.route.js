import {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  validateAccount,
  sendValidationEmail,
  verifyToken,
  signout,
  setupTwoFactorAuth,
  verifyTwoFactorAuth,
  disableTwoFactor
} from "../controllers/auth.controller.js";
import checkTokenBlacklist from "../middlewares/checkTokenBlacklist.js";
import { validateUser } from "../middlewares/userValidator.js";
import { handleValidationErrors } from "../middlewares/validationMiddleware.js";
import { Router } from "express";

const router = Router();

// Account access routes
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", checkTokenBlacklist, signout);
// Password Routes
router.post("/forgot-password", forgotPassword);
router.get("/reset-password/:token", verifyToken);
router.post("/reset-password/:token", resetPassword);
// Account Activation
router.post("/send-validation-email", sendValidationEmail);
router.post("/validate-account", validateAccount);
// 2FA Authentication Routes
router.post("/2fa/setup", setupTwoFactorAuth);
router.post("/2fa/verify", verifyTwoFactorAuth);
router.post('/disable-2fa', disableTwoFactor);

export default router;
