import express from 'express';
import { check } from 'express-validator';
import { createSalle, getSalle, updateSalle, deleteSalle } from '../controllers/salle.controller.js';

const router = express.Router();

router.post("/create",createSalle);

router.get('/:id', getSalle);

router.put('/:id',updateSalle);

router.delete('/:id', deleteSalle);

export default router;