import { Router } from "express";
import { getChatHistory } from "../controllers/chat.controllers.js"; // Adjust the path as necessary

const router = Router();

router.get('/:niveauEducatifId', getChatHistory);

export default router;