import express from 'express';
import { body, param } from 'express-validator';
import { getRestaurants, createRestaurant, updateRestaurant, deleteRestaurant } from '../controllers/restaurantController.js';

const router = express.Router();

 
const validateRestaurant = [
  body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
  body('facultyId').isMongoId().withMessage('Invalid faculty ID')
];

 
const validateRestaurantId = [
  param('id').isMongoId().withMessage('Invalid ID format')
];

 
router.get('/', getRestaurants);
router.post('/', validateRestaurant, createRestaurant);
router.put('/:id', validateRestaurantId, validateRestaurant, updateRestaurant);
router.delete('/:id', validateRestaurantId, deleteRestaurant);

export default router;
