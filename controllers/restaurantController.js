import Restaurant from '../models/Restaurant.js';
import { validationResult } from 'express-validator';

 
export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate('facultyId');
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error getting restaurants", error });
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
    res.status(500).json({ message: "Error creating restaurant", error });
  }
};

 
export const updateRestaurant = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { name, address, available, facultyId } = req.body;
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, { name, address, available, facultyId }, { new: true });
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ message: "Error updating restaurant", error });
  }
};

 
export const deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    await Restaurant.findByIdAndDelete(id);
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting restaurant", error });
  }
};
