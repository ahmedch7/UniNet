import express from 'express';
import { createPaymentIntent, handleWebhook } from '../controllers/stripe.controller.js';

const router = express.Router();

router.post('/create-payment-intent', createPaymentIntent);
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router;
