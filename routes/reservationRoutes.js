import express from 'express';
import { body, param } from 'express-validator';
import {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation
} from '../controllers/reservationController.js';

const router = express.Router();

const validateReservation = [
  body('userId').isMongoId().withMessage('Invalid user ID'),
  body('roomId').isMongoId().withMessage('Invalid room ID')
];

router.get('/', getReservations);
router.get('/:id', param('id').isMongoId().withMessage('Invalid ID format'), getReservationById);
router.post('/', validateReservation, createReservation);
router.put('/:id', param('id').isMongoId().withMessage('Invalid ID format'), validateReservation, updateReservation);
router.delete('/:id', param('id').isMongoId().withMessage('Invalid ID format'), deleteReservation);

export default router;
