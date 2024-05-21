import express from 'express';
import { getFoyers, createFoyer, getAvailablePlaces } from '../controllers/foyerController.js';

const router = express.Router();

router.get('/', getFoyers);
router.post('/', createFoyer);
router.get('/available', getAvailablePlaces);

export default router;
