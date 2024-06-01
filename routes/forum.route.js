import { Router } from 'express';
import { body } from 'express-validator';
import {
    createForum,
    getForums,
    getForumById,
    updateForum,
    deleteForum,
    getForumsByCategory,

} from '../controllers/forum.controller.js';

const router = Router();

// Create Forum
router.post(
    '/',
    [
        body('titreForum').isString().notEmpty(),
        body('userId').isMongoId()
    ],
    createForum
);

// Get all Forums
router.get('/', getForums);

// Get single Forum
router.get('/:id', getForumById);

// Update Forum
router.put(
    '/:id',
    [
        body('titreForum').isString().notEmpty(),
        body('userId').isMongoId()
    ],
    updateForum
);

// Delete Forum
router.delete('/:id', deleteForum);

// Get forums by category
router.get('/category/:category', getForumsByCategory);

export default router;
