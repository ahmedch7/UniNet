const Event = require('../models/Events')
const User = require('../models/User');
const getEvents = async (req, res) => {

    try {
        const event = await Event.find({})
        res.status(200).json(event)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const getEvent = async (req, res) => {
    try {
        const { id } = req.params
        const event = await Event.findById(id)
        res.status(200).json(event)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body)
        res.status(200).json(event)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
        if (!event) {
            res.status(404).json({ message: 'Event not found' });
            return;
        }

        const currentDate = new Date();
        const eventDate = new Date(event.date);

        if (eventDate <= currentDate) {
            event.status = 'Ended';
        } else if (event.Nbplaces === 0) {
            event.status = 'Full';
        }


        await event.save();

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params
        const event = await Event.findByIdAndDelete(id)
        if (!event) {
            res.status(404).json({ message: 'Event not found' })
        }
        res.status(200).json({ message: "Event Deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}
const likeEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { userId } = req.body;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (!event.likes.includes(userId)) {
            event.likes.push(userId);
            await event.save();
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const dislikeEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { userId } = req.body;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (!event.dislikes.includes(userId)) {
            event.dislikes.push(userId);
            await event.save();
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const addComment = async (io, req, res) => {
    try {
      const eventId = req.params.id;
      const { userId, text } = req.body;
  
      console.log('Adding comment:', { eventId, userId, text });
  
      const event = await Event.findById(eventId);
      if (!event) {
        console.log('Event not found');
        return res.status(404).json({ message: 'Event not found' });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found' });
      }
  
      const newComment = {
        user: userId,
        text,
        nom: user.nom, 
        createdAt: new Date()
      };
  
      event.comments.push(newComment);
      await event.save();
  
      io.emit('new-comment', newComment); 
  
      console.log('Comment added and emitted');
      res.status(201).json(newComment);
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).json({ message: error.message });
    }
  };
  

const updateComment = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const commentId = req.params.commentId;
        const { text } = req.body;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const comment = event.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        comment.text = text;
        await event.save();

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const commentId = req.params.commentId;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const comment = event.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        event.comments.pull(commentId);
        await event.save();

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getEvents, getEvent, createEvent, updateEvent, deleteEvent, likeEvent, dislikeEvent, addComment, updateComment, deleteComment,
}