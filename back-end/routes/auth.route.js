import {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  validateAccount,
  sendValidationEmail,
  verifyToken,
  setupTwoFactorAuth,
  verifyTwoFactorAuth,
  disableTwoFactor
} from "../controllers/auth.controller.js";
import checkTokenBlacklist from "../middlewares/checkTokenBlacklist.js";
import { validateUser } from "../middlewares/userValidator.js";
import { handleValidationErrors } from "../middlewares/validationMiddleware.js";
import multer, {diskStorage} from "multer";
import { Router } from "express";
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
// Account access routes
router.post("/signup",upload, signup);
router.post("/signin", signin);

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
