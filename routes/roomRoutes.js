import express from 'express';
import { body, param } from 'express-validator';
import {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  reserveRoom
} from '../controllers/roomController.js';

const router = express.Router();

 const validateRoom = [
  body('type').isIn(['double', 'triple']).withMessage('Invalid room type'),
  body('capacity').isInt({ min: 1 }).withMessage('Capacity must be a positive integer'),
  body('foyerId').isMongoId().withMessage('Invalid foyer ID')
];

 const validateReservation = [
  body('roomId').isMongoId().withMessage('Invalid room ID'),
  body('places').isInt({ min: 1 }).withMessage('Places must be a positive integer')
];

 router.get('/', getRooms);
router.get('/:id', param('id').isMongoId().withMessage('Invalid ID format'), getRoomById);
router.post('/', validateRoom, createRoom);
router.put('/:id', param('id').isMongoId().withMessage('Invalid ID format'), validateRoom, updateRoom);
router.delete('/:id', param('id').isMongoId().withMessage('Invalid ID format'), deleteRoom);

router.post('/reserve', validateReservation, reserveRoom);

export default router;
