import mongoose from 'mongoose';

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

CommentSchema.pre('save', async function(next) {
    try {
        const user = await mongoose.model('User').findById(this.user);
        if (user) {
            this.nom = user.nom;
        }
        next();
    } catch (error) {
        next(error);
    }
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;
