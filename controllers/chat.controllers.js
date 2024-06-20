import chatModel from '../models/chat.js';

export const getChatHistory = async (req, res) => {
    try {
        const { niveauEducatifId } = req.params;
        const messages = await chatModel.find({ niveauEducatifId }).sort('timestamp');
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};