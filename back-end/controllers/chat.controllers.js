import Chat from '../models/chat.js';
import User from '../models/User.js';

// Add a new message

export const addMessage = async (req, res) => {
    try {
      const { text, userId } = req.body;
      const classId = req.params.classId;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const newMessage = new Chat({
        text,
        user: userId,
        classId
      });
  
      await newMessage.save();
  
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ message: error.message });
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
