import { body } from 'express-validator';

export const validateUser = [
  body('nom').notEmpty().withMessage('Nom is required'),
  body('prenom').notEmpty().withMessage('Prenom is required'),
  body('email').isEmail().withMessage('Email is invalid'),
  body('dateDeNaissance').isISO8601().withMessage('Date de Naissance must be a valid date'),
  body('numTel').isMobilePhone().withMessage('Num Tel is invalid'),
  body('motDePasse').isLength({ min: 6 }).withMessage('Mot de Passe must be at least 6 characters long'),
  body('role').notEmpty().withMessage('Role is required')
];