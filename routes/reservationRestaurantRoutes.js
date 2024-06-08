import express from 'express';
import { body, param } from 'express-validator';
import {
  createRestaurantReservation,
  getRestaurantReservations,
  getRestaurantReservationById,
  deleteRestaurantReservation
} from '../controllers/ReservationRestaurantController.js';

const router = express.Router();

const validateRestaurantReservation = [
  body('userId').isMongoId().withMessage('Invalid user ID'),
  body('restaurantId').isMongoId().withMessage('Invalid restaurant ID')
];

router.get('/', getRestaurantReservations);
router.get('/:id', param('id').isMongoId().withMessage('Invalid ID format'), getRestaurantReservationById);
router.post('/', validateRestaurantReservation, createRestaurantReservation);
router.delete('/:id', param('id').isMongoId().withMessage('Invalid ID format'), deleteRestaurantReservation);

export default router;
