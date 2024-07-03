import express from 'express';
import { body } from 'express-validator';
import { addComment, getComments, deleteComment } from '../controllers/commentMenuRestauController.js';

const router = express.Router();

const validateComment = [
  body('content').isLength({ min: 5 }).withMessage('Content must be at least 5 characters long'),
  body('author').isMongoId().withMessage('Author must be a valid user ID')
];

router.post('/:menuId/comments', addComment);
router.get('/:menuId/comments', getComments);
router.delete('/:menuId/comments/:commentId', deleteComment);

export default router;
