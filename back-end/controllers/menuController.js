import Menu from '../models/Menu.js';
import Comment from '../models/CommentMenuRestau.js';
import { validationResult } from 'express-validator';


export const getMenus = async (req, res) => {
  try {
    const menus = await Menu.find().populate('comments').populate('restaurantId');
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

  const { text, restaurantId } = req.body;
  let imagePath = '';
  if (req.file) {
    imagePath = req.file.path.replace('public/', ''); // Remove 'public/' to keep the relative path
  }
  try {
    const newMenu = new Menu({ text, image: imagePath, restaurantId });
    await newMenu.save();
    res.status(201).json(newMenu);
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
  const { text } = req.body;
  let imagePath = req.body.image; // Default to existing image

  if (req.file) {
    imagePath = req.file.path.replace('public/', ''); // Remove 'public/' to keep the relative path
  }

  try {
    const updatedMenu = await Menu.findByIdAndUpdate(id, { text, image: imagePath }, { new: true });
    res.status(200).json(updatedMenu);
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

export const addComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { content, author } = req.body;
  const { menuId } = req.params;

  try {
    const newComment = new Comment({ content, author });
    await newComment.save();

    const menu = await Menu.findById(menuId);
    menu.comments.push(newComment._id);
    await menu.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};
