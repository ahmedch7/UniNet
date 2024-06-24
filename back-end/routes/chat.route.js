import express from 'express';
import { addMessage, updateMessage, deleteMessage, getMessagesByClass } from '../controllers/chat.controllers.js';

const router = express.Router();

export default function(io) {
    router.post('/:classId/add', (req, res) => {
        addMessage(req, res, io); // Pass io to addMessage function
    });
    router.put('/update/:id', updateMessage);
    router.delete('/delete/:id', deleteMessage);
    router.get('/class/:classId', getMessagesByClass);

    return router;
}
