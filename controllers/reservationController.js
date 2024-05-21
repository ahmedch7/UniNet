import Reservation from '../models/Reservation.js';
import { validationResult } from 'express-validator';

export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error getting reservations", error });
  }
};

export const createReservation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { customerName, date } = req.body;
  try {
    const newReservation = new Reservation({ customerName, date });
    await newReservation.save();
    res.status(201).json({ message: "Reservation created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating reservation", error });
  }
};

export const updateReservationStatus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json({ message: "Reservation status updated successfully", updatedReservation });
  } catch (error) {
    res.status(500).json({ message: "Error updating reservation status", error });
  }
};
