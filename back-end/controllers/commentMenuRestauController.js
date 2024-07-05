import Menu from '../models/Menu.js';
import Comment from '../models/CommentMenuRestau.js';
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
    const menu = await Menu.findById(menuId).populate({
      path: 'comments',
      populate: {
        path: 'author',
        model: 'User', 
        select: 'nom' 
      }
    });

    res.status(200).json(menu.comments);
  } catch (error) {
    res.status(500).json({ message: "Error getting comments", error });
  }
};
export const deleteComment = async (req, res) => {
  const { menuId, commentId } = req.params;

  try {
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    // Vérifiez si le commentaire appartient au menu
    if (!menu.comments.includes(commentId)) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    await Comment.findByIdAndDelete(commentId);

    // Supprimez le commentaire de la liste des commentaires du menu
    menu.comments = menu.comments.filter(c => c.toString() !== commentId);
    await menu.save();

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment', error });
  }
};