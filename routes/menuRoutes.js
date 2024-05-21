import express from 'express';
import { body, param } from 'express-validator';
import { getMenus, createMenu, updateMenu, deleteMenu } from '../controllers/menuController.js';

const router = express.Router();

const validateMenu = [
  body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
  body('description').isLength({ min: 3 }).withMessage('Description must be at least 3 characters long')
];

const validateMenuId = [
  param('id').isMongoId().withMessage('Invalid ID format')
];

router.get('/', getMenus);
router.post('/', validateMenu, createMenu);
router.put('/:id', validateMenuId, validateMenu, updateMenu);
router.delete('/:id', validateMenuId, deleteMenu);

export default router;
