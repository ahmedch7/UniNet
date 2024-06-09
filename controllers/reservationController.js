

import Reservation from '../models/Reservation.js';
import Room from '../models/Room.js';
import User from '../models/User.js';

export const createReservation = async (req, res) => {
  const { userId, roomId } = req.body;

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (room.availablePlaces < 1) {
      return res.status(400).json({ message: 'No available places' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newReservation = new Reservation({
      userId,
      roomId,
      userName: user.nom,   
      places: 1
    });
    await newReservation.save();

    room.availablePlaces -= 1;
    await room.save();

    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ message: 'Error creating reservation', error });
  }
};

export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('userId', 'nom').populate('roomId');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error getting reservations', error });
  }
};

export const getReservationById = async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findById(id).populate('userId', 'nom').populate('roomId');
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Error getting reservation', error });
  }
};

export const updateReservation = async (req, res) => {
 
};

export const deleteReservation = async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    const room = await Room.findById(reservation.roomId);
    room.availablePlaces += reservation.places;
    await room.save();

    await reservation.remove();

    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting reservation', error });
  }
};
