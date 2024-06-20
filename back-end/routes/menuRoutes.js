import express from 'express';
import { body, param } from 'express-validator';
import { getMenus, createMenu, updateMenu, deleteMenu, addComment } from '../controllers/menuController.js';

const router = express.Router();

const validateMenu = [
  body('text').isLength({ min: 5 }).withMessage('Text must be at least 5 characters long'),
  body('restaurantId').isMongoId().withMessage('Invalid restaurant ID')
];

router.get('/', getMenus);
router.post('/', validateMenu, createMenu);
router.put('/:id', validateMenu, updateMenu);
router.delete('/:id', deleteMenu);

const validateComment = [
  body('content').isLength({ min: 1 }).withMessage('Content must not be empty'),
  body('author').isMongoId().withMessage('Invalid author ID'),
  body('menuId').isMongoId().withMessage('Invalid menu ID')
];

router.post('/comment', validateComment, addComment);

export default router;
