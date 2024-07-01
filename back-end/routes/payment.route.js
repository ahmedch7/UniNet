import express from 'express';
import { createPaymentIntent, handleWebhook } from '../controllers/stripe.controller.js';
import auth from "../middlewares/auth.js";
import roleAuth from "../middlewares/roleAuth.js";

const router = express.Router();

router.post('/create-payment-intent',auth,roleAuth(["etudiant","admin"]), createPaymentIntent);
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router;
