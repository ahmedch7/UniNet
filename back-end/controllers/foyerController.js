import Foyer from '../models/Foyer.js';

export const getFoyers = async (req, res) => {
  try {
    const foyers = await Foyer.find().populate('rooms');
    res.status(200).json(foyers);
  } catch (error) {
    res.status(500).json({ message: "Error getting foyers", error });
  }
};


export const createFoyer = async (req, res) => {
  const { name, address, facultyId } = req.body;
  try {
    const newFoyer = new Foyer({ name, address, facultyId });
    await newFoyer.save();
    res.status(201).json(newFoyer);
  } catch (error) {
    res.status(500).json({ message: "Error creating foyer", error });
  }
};

export const updateFoyer = async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;
  try {
    const updatedFoyer = await Foyer.findByIdAndUpdate(id, { name, address }, { new: true });
    res.status(200).json(updatedFoyer);
  } catch (error) {
    res.status(500).json({ message: "Error updating foyer", error });
  }
};

export const deleteFoyer = async (req, res) => {
  const { id } = req.params;
  try {
    await Foyer.findByIdAndDelete(id);
    res.status(200).json({ message: "Foyer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting foyer", error });
  }
};

export const getAvailablePlaces = async (req, res) => {
  try {
    const foyers = await Foyer.find().populate({
      path: 'rooms',
      match: { availablePlaces: { $gt: 0 } }
    });
    res.status(200).json(foyers);
  } catch (error) {
    res.status(500).json({ message: "Error getting available places", error });
  }
};

export const getRoomsByFoyerId = async (req, res) => {
  const { foyerId } = req.query;
  try {
    const rooms = await Room.find({ foyerId }).populate('foyerId');
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error getting rooms by foyerId", error });
  }
};
