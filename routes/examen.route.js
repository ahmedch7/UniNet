import express from 'express';
import { check } from 'express-validator';
import { createExamen, getExamen, updateExamen, deleteExamen } from '../controllers/examen.controller.js';

const router = express.Router();

router.post('/examen',createExamen);

router.get('/:id', getExamen);

router.put('/:id',updateExamen);

router.delete('/:id', deleteExamen);

export default router;