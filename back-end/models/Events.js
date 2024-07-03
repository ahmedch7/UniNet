import mongoose from 'mongoose';
import Participation from './participant.js';
import CommentEvent from './CommentEvents.js';
const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the event name."],
    },
    description: {
        type: String,
        required: [true, "Please enter a description for the event."],
    },
    status: {
        type: String,
        enum: ['Available', 'Full', 'Ended', "Canceled"],
        required: true,
        default: 'Available',
    },
    date: {
        type: Date,
        required: [true, "Please enter the date of the event."],
    },
    image: {
        type: String,
        required: [true, "Please provide an image for the event."],
    },
    Nbplaces: {
        type: Number,
        required: [true, "Please specify the number of places available for the event."],
    },
    location: {
        type: String,
        required: [true, "Please enter the location of the event."],
    },
    tags: [{
        type: String,
        enum: ['Workshop', 'Conference', 'Concert', 'Seminar', 'Networking', 'Exhibition', 'Other'],
        required: true,
    }],
    categories: [{
        type: String,
        enum: ['Technology', 'Business', 'Art', 'Science', 'Education', 'Health', 'Sports', 'Music', 'Food', 'Other'],
        required: true,
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    comments: [CommentEvent.schema],
    participants: [Participation.schema],

}, {
    timestamps: true,
});

const Event = mongoose.model('Event', EventSchema);
export default Event;
