import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    nom: { 
        type: String,
        required: false
    },
    text: {
        type: String,
        required: [true, "Please enter a Message."],
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classe',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

ChatSchema.pre('save', async function(next) {
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

const Chat = mongoose.model('Chat', ChatSchema);
export default Chat;
