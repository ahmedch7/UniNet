import ReservationRestaurant from '../models/ReservationRestaurant.js';
import Restaurant from '../models/Restaurant.js';
import User from '../models/User.js';

export const createRestaurantReservation = async (req, res) => {
  const { userId, restaurantId } = req.body;

  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    if (restaurant.availablePlaces < 1) {
      return res.status(400).json({ message: 'No available places' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

     const existingReservation = await ReservationRestaurant.findOne({
      userId,
      restaurantId
    });

    if (existingReservation) {
      return res.status(400).json({ message: 'User has already made a reservation in this restaurant' });
    }

    const newReservation = new ReservationRestaurant({
      userId,
      restaurantId,
      userName: user.nom
    });
    await newReservation.save();

    restaurant.availablePlaces -= 1;
    await restaurant.save();

    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ message: 'Error creating restaurant reservation', error });
  }
};

export const getRestaurantReservations = async (req, res) => {
  try {
    const reservations = await ReservationRestaurant.find().populate('userId', 'nom').populate('restaurantId');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error getting reservations', error });
  }
};

export const getRestaurantReservationById = async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await ReservationRestaurant.findById(id).populate('userId', 'nom').populate('restaurantId');
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Error getting reservation', error });
  }
};

export const deleteRestaurantReservation = async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await ReservationRestaurant.findById(id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    const restaurant = await Restaurant.findById(reservation.restaurantId);
    restaurant.availablePlaces += 1;
    await restaurant.save();

    await reservation.remove();

    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting reservation', error });
  }
};
