import Foyer from '../models/Foyer.js';

export const getFoyers = async (req, res) => {
  try {
    const foyers = await Foyer.find();
    res.status(200).json(foyers);
  } catch (error) {
    res.status(500).json({ message: "Error getting foyers", error });
  }
};

export const createFoyer = async (req, res) => {
  const { name, address, capacity } = req.body;
  try {
    const newFoyer = new Foyer({ name, address, capacity });
    await newFoyer.save();
    res.status(201).json(newFoyer);
  } catch (error) {
    res.status(500).json({ message: "Error creating foyer", error });
  }
};

export const getAvailablePlaces = async (req, res) => {
  try {
    const foyers = await Foyer.find({ available: true });
    res.status(200).json(foyers);
  } catch (error) {
    res.status(500).json({ message: "Error getting available places", error });
  }
};
