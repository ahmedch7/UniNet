import Restaurant from '../models/Restaurant.js';
import { validationResult } from 'express-validator';

export const getRestaurants = async (req, res) => {
  try {
    console.log('Fetching restaurants from the database...');
    const restaurants = await Restaurant.find();
    console.log('Restaurants fetched successfully:', restaurants);
    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error getting restaurants:', error);
    res.status(500).json({ message: "Error getting restaurants", error: error.message });
  }
};
export const createRestaurant = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, address, available, facultyId } = req.body;

  try {
    const newRestaurant = new Restaurant({ name, address, available, facultyId });
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    console.error('Error creating restaurant:', error);
    res.status(500).json({ message: "Error creating restaurant", error: error.message });
  }
};

export const updateRestaurant = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { name, address, available } = req.body;
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, { name, address, available }, { new: true });
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    console.error('Error updating restaurant:', error);
    res.status(500).json({ message: "Error updating restaurant", error: error.message });
  }
};

export const deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    await Restaurant.findByIdAndDelete(id);
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    res.status(500).json({ message: "Error deleting restaurant", error: error.message });
  }
};
