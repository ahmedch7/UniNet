import express from 'express';
import { param } from 'express-validator';
import {
  getReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
  getReservationsByRoomId
} from '../controllers/reservationController.js';

const router = express.Router();

// Middleware de validation des paramètres
const validateId = param('id').isMongoId().withMessage('Invalid ID format');

// Routes des réservations
router.get('/', getReservations);
router.get('/:id', validateId, getReservationById);
router.post('/', createReservation);
router.put('/:id', validateId, updateReservation);
router.delete('/:id', validateId, deleteReservation);

// Route pour récupérer les réservations par chambre
router.get('/room/:roomId', param('roomId').isMongoId().withMessage('Invalid room ID'), getReservationsByRoomId);

export default router;
