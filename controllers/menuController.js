import Menu from '../models/Menu.js';
import { validationResult } from 'express-validator';

export const getMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: "Error getting menus", error });
  }
};

export const createMenu = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description } = req.body;
  try {
    const newMenu = new Menu({ title, description });
    await newMenu.save();
    res.status(201).json({ message: "Menu created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating menu", error });
  }
};

export const updateMenu = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatedMenu = await Menu.findByIdAndUpdate(id, { title, description }, { new: true });
    res.status(200).json({ message: "Menu updated successfully", updatedMenu });
  } catch (error) {
    res.status(500).json({ message: "Error updating menu", error });
  }
};

export const deleteMenu = async (req, res) => {
  const { id } = req.params;
  try {
    await Menu.findByIdAndDelete(id);
    res.status(200).json({ message: "Menu deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting menu", error });
  }
};
