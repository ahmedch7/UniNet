import express from 'express';
import { body, param } from 'express-validator';
import { getRestaurants, createRestaurant, updateRestaurant, deleteRestaurant } from '../controllers/restaurantController.js';

const router = express.Router();

const validateRestaurant = [
  body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
  body('facultyId').isMongoId().withMessage('Invalid faculty ID'),
  body('capacity').isInt({ min: 1 }).withMessage('Capacity must be a positive integer'),
  body('availablePlaces').isInt({ min: 0 }).withMessage('Available places must be a non-negative integer')
];

router.get('/', getRestaurants);
router.post('/', validateRestaurant, createRestaurant);
router.put('/:id', [
  param('id').isMongoId().withMessage('Invalid ID format'),
  ...validateRestaurant
], updateRestaurant);
router.delete('/:id', [
  param('id').isMongoId().withMessage('Invalid ID format')
], deleteRestaurant);

export default router;
