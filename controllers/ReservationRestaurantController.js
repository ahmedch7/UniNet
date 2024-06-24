import ReservationRestaurant from '../models/ReservationRestaurant.js';
import Restaurant from '../models/Restaurant.js';
import User from '../models/User.js';
import { validationResult } from 'express-validator';

// Créer une réservation pour un restaurant
export const createRestaurantReservation = async (req, res) => {
  const { userId, restaurantId } = req.body;

  try {
    // Vérifier si le restaurant existe
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Vérifier s'il y a des places disponibles
    if (restaurant.availablePlaces < 1) {
      return res.status(400).json({ message: 'No available places' });
    }

    // Vérifier si l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Vérifier si l'utilisateur a déjà une réservation aujourd'hui
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Début de la journée
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Début de demain

    const existingReservation = await ReservationRestaurant.findOne({
      userId,
      restaurantId,
      date: { $gte: today, $lt: tomorrow }
    });

    if (existingReservation) {
      return res.status(400).json({ message: 'User has already made a reservation in this restaurant today' });
    }

    // Créer une nouvelle réservation
    const newReservation = new ReservationRestaurant({
      userId,
      restaurantId,
      userName: user.nom, // Assurez-vous que 'nom' correspond au champ approprié de votre modèle User
      date: today // Date de la réservation
    });

    // Sauvegarder la nouvelle réservation
    await newReservation.save();

    // Mettre à jour la capacité disponible du restaurant
    restaurant.availablePlaces -= 1;
    await restaurant.save();

    // Répondre avec la nouvelle réservation créée
    res.status(201).json(newReservation);
  } catch (error) {
    // Gérer les erreurs
    res.status(500).json({ message: 'Error creating restaurant reservation', error });
  }
};

// Obtenir toutes les réservations de restaurants
export const getRestaurantReservations = async (req, res) => {
  try {
    // Récupérer toutes les réservations avec les détails de l'utilisateur et du restaurant associés
    const reservations = await ReservationRestaurant.find()
      .populate('userId', 'nom') // Remplacez 'nom' par les champs appropriés de votre modèle User
      .populate('restaurantId'); // Populer les détails du restaurant

    // Répondre avec les réservations récupérées
    res.status(200).json(reservations);
  } catch (error) {
    // Gérer les erreurs
    res.status(500).json({ message: 'Error getting reservations', error });
  }
};

// Obtenir une réservation spécifique par son ID
export const getRestaurantReservationById = async (req, res) => {
  const { id } = req.params;
  try {
    // Rechercher la réservation par ID avec les détails de l'utilisateur et du restaurant
    const reservation = await ReservationRestaurant.findById(id)
      .populate('userId', 'nom') // Remplacez 'nom' par les champs appropriés de votre modèle User
      .populate('restaurantId'); // Populer les détails du restaurant

    // Vérifier si la réservation existe
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Répondre avec la réservation récupérée
    res.status(200).json(reservation);
  } catch (error) {
    // Gérer les erreurs
    res.status(500).json({ message: 'Error getting reservation', error });
  }
};

// Supprimer une réservation de restaurant spécifique par son ID
export const deleteRestaurantReservation = async (req, res) => {
  const { id } = req.params;
  try {
    // Rechercher la réservation par ID
    const reservation = await ReservationRestaurant.findById(id);

    // Vérifier si la réservation existe
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Trouver le restaurant associé à la réservation
    const restaurant = await Restaurant.findById(reservation.restaurantId);

    // Augmenter la capacité disponible du restaurant
    restaurant.availablePlaces += 1;
    await restaurant.save();

    // Supprimer la réservation
    await reservation.remove();

    // Répondre avec un message de succès
    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    // Gérer les erreurs
    res.status(500).json({ message: 'Error deleting reservation', error });
  }
};
