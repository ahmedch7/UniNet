const express = require('express');
const { getReservations, createReservation, updateReservationStatus } = require('../controllers/reservationController');
const router = express.Router();

router.get('/', getReservations);
router.post('/', createReservation);
router.put('/:id', updateReservationStatus);

module.exports = router;
