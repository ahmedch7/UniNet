import express from 'express';
import { check } from 'express-validator';
import { createExamen, getExamen, updateExamen, deleteExamen } from '../controllers/examen.controller.js';

const router = express.Router();

router.post('/create',createExamen);

router.get('/:id', getExamen);

router.put('/:id',updateExamen);

router.delete('/:id', deleteExamen);

router.post('/create',createExamen);
export default router;