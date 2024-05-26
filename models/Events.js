const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    nom: { 
        type: String,
        required: false
    },
    text: {
        type: String,
        required: [true, "Please enter a comment."],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    
});

const EventSchema = mongoose.Schema({
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
        enum: ['Available', 'Full', 'Ended',"Canceled"],
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
    comments: [CommentSchema],
},
{
    timestamps: true,
});

const Event = mongoose.model("Event", EventSchema);
CommentSchema.pre('save', async function(next) {
    try {
        // Fetch the associated user document
        const user = await mongoose.model('User').findById(this.user);
        if (user) {
            // Populate the 'nom' field with the user's name
            this.nom = user.nom;
        }
        next();
    } catch (error) {
        next(error);
    }
});
const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;

module.exports = Event;
