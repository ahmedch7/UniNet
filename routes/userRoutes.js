import express from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

const validateRegister = [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

const validateLogin = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);

export default router;
