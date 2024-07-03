import express from 'express';
import { body } from 'express-validator';
import { getMenus, createMenu, updateMenu, deleteMenu, addComment } from '../controllers/menuController.js';

import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.split(" ").join("_");
    const extension = path.extname(file.originalname);
    cb(null, name + Date.now() + extension);
  }
});

const upload = multer({ storage }).single("image");

 

router.get('/', getMenus);
router.post('/', upload, createMenu);
router.put('/:id', upload, updateMenu);
router.delete('/:id', deleteMenu);

const validateComment = [
  body('content').isLength({ min: 1 }).withMessage('Content must not be empty'),
  body('author').isMongoId().withMessage('Invalid author ID')
];

router.post('/:menuId/comments', validateComment, addComment);

export default router;
