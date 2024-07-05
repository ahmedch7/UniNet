import express from 'express';
import {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    likeEvent,
    dislikeEvent,
    addComment,
    deleteComment,
    updateComment,
    participateEvent,
    deleteParticipation,
    participatedEvents,
    getRecommendedEvents,
    getNearbyEvents,
} from '../controllers/event.controller.js';

export default (io) => {
    const router = express.Router();

    router.get('/recommended-events', getRecommendedEvents);
    router.get('/nearby-events', getNearbyEvents);

    router.get('/', getEvents);
    router.get('/:id', getEvent);
    router.post('/', createEvent);
    router.put('/:id', updateEvent);
    router.delete('/:id', deleteEvent);
    router.post('/:id/like', likeEvent);
    router.post('/:id/dislike', dislikeEvent);
    router.post('/:id/comments', (req, res) => addComment(io, req, res));
    router.put('/:eventId/comments/:commentId', updateComment);
    router.delete('/:eventId/comments/:commentId', deleteComment);
    router.post('/:id/participate', participateEvent);
    router.delete('/:eventId/participants/:participationId', deleteParticipation);
    router.post('/:eventId/participate/:userId', participatedEvents);

    return router;
};
