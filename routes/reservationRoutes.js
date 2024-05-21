import express from 'express';
import { body, param } from 'express-validator';
import { getReservations, createReservation, updateReservationStatus } from '../controllers/reservationController.js';

const router = express.Router();

const validateReservation = [
  body('customerName').isLength({ min: 3 }).withMessage('Customer name must be at least 3 characters long'),
  body('date').isISO8601().withMessage('Invalid date format')
];

const validateReservationId = [
  param('id').isMongoId().withMessage('Invalid ID format')
];

router.get('/', getReservations);
router.post('/', validateReservation, createReservation);
router.put('/:id', validateReservationId, updateReservationStatus);

export default router;
