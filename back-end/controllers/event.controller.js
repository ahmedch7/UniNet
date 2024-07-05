import Event from '../models/Events.js';
import User from '../models/User.js';
import CommentEvent from '../models/CommentEvents.js';
import { sendParticipationEmail } from '../controllers/email.controller.js';
import axios from 'axios';

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
        const comment = await CommentEvent.create(newComment);

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

        if (event.Nbplaces > 0) {
            event.Nbplaces--;
            if (event.Nbplaces === 0) {
                event.status = 'Full';
            }

            event.participants.push({ user: userId, username });
            await event.save();

            await User.findByIdAndUpdate(userId, { $addToSet: { participatedEvents: eventId } });

            // Send participation email
            const user = await User.findById(userId);
            if (user) {
                await sendParticipationEmail(user.email, user.nom, user.prenom, event.name, event.location, event.date, event.description,eventId);
                console.log(event.eventId)
            }

            res.status(200).json(event);
        } else {
            res.status(400).json({ message: 'No more places available' });
        }
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
    }};

export const participatedEvents= async (req, res) => {
    try {
      const { eventId, userId } = req.params;
  
      // Add event to user's participatedEvents
      await User.findByIdAndUpdate(userId, { $addToSet: { participatedEvents: eventId } });
  
      // Add user to event's participants
      const event = await Event.findByIdAndUpdate(eventId, {
        $addToSet: { participants: { user: userId } }
      }, { new: true });
  
      res.json(event);
    } catch (error) {
      console.error('Error participating in event:', error);
      res.status(500).send('Server error');
    }
  };
  export const getRecommendedEvents = async (req, res) => {
    try {
        const { userId } = req.query;

        // Find the user and populate the participatedEvents field
        const user = await User.findById(userId).populate('participatedEvents');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract tags and categories from user's participated events
        const tags = new Set();
        const categories = new Set();

        user.participatedEvents.forEach(event => {
            event.tags.forEach(tag => tags.add(tag));
            event.categories.forEach(category => categories.add(category));
        });

        const tagArray = Array.from(tags);
        const categoryArray = Array.from(categories);

        // Query events based on tags and categories
        const recommendedEvents = await Event.find({
            $or: [
                { tags: { $in: tagArray } },
                { categories: { $in: categoryArray } }
            ]
        });

        res.status(200).json(recommendedEvents);
    } catch (error) {
        console.error('Error fetching recommended events:', error);
        res.status(500).json({ message: error.message });
    }
};

const convertToCoordinates = async (address) => {
    const apiKey = 'AIzaSyDhJ1QaIMu0XptyDLOUSs1YzQ4SmH7jVG8'; // Replace with your actual API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.status === 'OK') {
            const { lat, lng } = data.results[0].geometry.location;
            return { latitude: lat, longitude: lng };
        } else {
            throw new Error(`Geocoding failed with status: ${data.status} - ${data.error_message}`);
        }
    } catch (error) {
        console.error('Error converting address to coordinates:', error);
        throw error;
    }
};
export const getNearbyEvents = async (req, res) => {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    try {
        const events = await Event.find();
        const nearbyEvents = [];

        for (const event of events) {
            try {
                const { location } = event;
                const { latitude: eventLat, longitude: eventLng } = await convertToCoordinates(location);

                const distance = calculateDistance(latitude, longitude, eventLat, eventLng);

                if (distance <= 100) { 
                    nearbyEvents.push(event);
                }
            } catch (conversionError) {
                console.error(`Error converting address for event ${event._id}:`, conversionError.message);
            }
        }

        res.json(nearbyEvents);
    } catch (error) {
        console.error('Error fetching nearby events:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Helper function to calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}

