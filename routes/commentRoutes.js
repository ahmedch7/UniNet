import express from 'express';
import { body } from 'express-validator';
import { addComment, getComments } from '../controllers/commentController.js';

const router = express.Router();

// Middleware de validation pour les commentaires
const validateComment = [
  body('content').isLength({ min: 5 }).withMessage('Content must be at least 5 characters long'),
  body('author').isLength({ min: 3 }).withMessage('Author name must be at least 3 characters long')
];

// Routes
router.post('/:menuId/comments', validateComment, addComment);
router.get('/:menuId/comments', getComments);

export default router;
