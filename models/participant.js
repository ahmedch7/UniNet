import mongoose from 'mongoose';

const ParticipationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    nom: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

ParticipationSchema.pre('save', async function(next) {
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

const Participation = mongoose.model('Participation', ParticipationSchema);
export default Participation;
