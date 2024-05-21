import Menu from '../models/Menu.js';
import Comment from '../models/Comment.js';
import { validationResult } from 'express-validator';

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

export const getComments = async (req, res) => {
  const { menuId } = req.params;

  try {
    const menu = await Menu.findById(menuId).populate('comments');
    res.status(200).json(menu.comments);
  } catch (error) {
    res.status(500).json({ message: "Error getting comments", error });
  }
};
