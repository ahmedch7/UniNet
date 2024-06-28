import Chat from '../models/chat.js';

// Add a new message
export const addMessage = async (req, res, io) => {
  const { classId } = req.params;
  const { user, text } = req.body;
  try {
      const newMessage = new Chat({ user, text, classId });
      await newMessage.save();
      // Emit to Socket.IO clients here if needed
      io.emit('newMessage', newMessage);
      res.status(201).json(newMessage);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


// Update a message
export const updateMessage = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    try {
        const updatedMessage = await Chat.findByIdAndUpdate(id, { text }, { new: true });
        if (!updatedMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a message
export const deleteMessage = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMessage = await Chat.findByIdAndDelete(id);
        if (!deletedMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get messages for a specific class
export const getMessagesByClass = async (req, res) => {
    const { classId } = req.params;
    try {
        const messages = await Chat.find({ classId }).populate('user', 'nom');
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
