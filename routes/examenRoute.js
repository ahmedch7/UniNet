import express from 'express';
import { createExamen, getExamen, updateExamen, deleteExamen} from '../controllers/examenController.js';


const router = express.Router();
router.post('/create',createExamen);

router.get('/:id', getExamen);

router.put('/:id',updateExamen);

router.delete('/:id', deleteExamen);

export default router;