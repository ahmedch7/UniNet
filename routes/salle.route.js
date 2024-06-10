import express from 'express';
import { check } from 'express-validator';
import { createSalle, getSalle, updateSalle, deleteSalle ,createExamForSalle, findAllSalles} from '../controllers/salle.controller.js';
import { releaseExpiredExams } from '../controllers/schedule.js'

const router = express.Router();

router.post("/create",createSalle);

router.get('/:id', getSalle);
router.get('/', findAllSalles); // New route for finding all salles
//router.put('/:id', updateSalle);

router.put('/:id',updateSalle);

router.delete('/:id', deleteSalle);

router.post("/examen/:id",createExamForSalle);

router.post("/releaseExpiredExams",releaseExpiredExams);

export default router;