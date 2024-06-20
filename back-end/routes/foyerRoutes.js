import express from 'express';
import { body, param } from 'express-validator';
import {
  getFoyers,
  createFoyer,
  updateFoyer,
  deleteFoyer,
  getAvailablePlaces
} from '../controllers/foyerController.js';

const router = express.Router();

 const validateFoyer = [
  body('name').isString().withMessage('Name must be a string'),
  body('address').isString().withMessage('Address must be a string'),
  body('facultyId').isMongoId().withMessage('Invalid faculty ID')
];

 router.get('/', getFoyers);
router.post('/', validateFoyer, createFoyer);
router.put('/:id', param('id').isMongoId().withMessage('Invalid ID format'), validateFoyer, updateFoyer);
router.delete('/:id', param('id').isMongoId().withMessage('Invalid ID format'), deleteFoyer);
router.get('/available', getAvailablePlaces);

export default router;
