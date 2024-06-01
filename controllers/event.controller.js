import Event from '../models/Events.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';
export const getEvents = async (req, res) => {
    try {
        const { name, date, location, status, sortField, sortOrder } = req.query;

        let filters = {};
        if (name) {
            filters.name = new RegExp(name, 'i');
        }
        if (date) {
            filters.date = new Date(date);
        }
        if (location) {
            filters.location = new RegExp(location, 'i');
        }
        if (status) {
            filters.status = status;
        }

        let sortOptions = {};
        if (sortField) {
            sortOptions[sortField] = sortOrder === 'desc' ? -1 : 1;
        }

        const events = await Event.find(filters).sort(sortOptions);
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body);
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateEvent = async (req, res) => {
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

export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: "Event Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const likeEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { userId } = req.body;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (!event.likes.includes(userId)) {
            // Remove user from dislikes if already disliked
            const dislikeIndex = event.dislikes.indexOf(userId);
            if (dislikeIndex !== -1) {
                event.dislikes.splice(dislikeIndex, 1);
            }

            event.likes.push(userId);
            await event.save();
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const dislikeEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { userId } = req.body;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (!event.dislikes.includes(userId)) {
            // Remove user from likes if already liked
            const likeIndex = event.likes.indexOf(userId);
            if (likeIndex !== -1) {
                event.likes.splice(likeIndex, 1);
            }

            event.dislikes.push(userId);
            await event.save();
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const addComment = async (io, req, res) => {
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

export const deleteComment = async (req, res) => {
    try {
        const { eventId, commentId } = req.params;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const commentIndex = event.comments.findIndex(comment => comment._id.toString() === commentId);
        if (commentIndex === -1) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        event.comments.splice(commentIndex, 1);
        await event.save();

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { eventId, commentId } = req.params;
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

        res.status(200).json({ message: 'Comment updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const participateEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { userId, username } = req.body;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const isParticipating = event.participants.some(participant => participant.user.toString() === userId);
        if (isParticipating) {
            return res.status(400).json({ message: 'User is already participating in this event' });
        }

        event.participants.push({ user: userId, username });
        await event.save();

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteParticipation = async (req, res) => {
    try {
        const { eventId, participationId } = req.params;

        // Find the event by ID
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Find the index of the participation in the event's participants array
        const participationIndex = event.participants.findIndex(participation => participation._id.toString() === participationId);
        if (participationIndex === -1) {
            return res.status(404).json({ message: 'Participation not found' });
        }

        // Remove the participation from the participants array
        event.participants.splice(participationIndex, 1);
        await event.save();

        res.status(200).json({ message: 'Participation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




