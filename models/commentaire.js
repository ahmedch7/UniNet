import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const commentaireSchema = new Schema({
    contenuCommentaire: { type: String, required: true },
    dateCommentaire: { type: Date, default: Date.now },
    userId: {
        type: Types.ObjectId,
        ref: "user"
    },
    publicationId: {
        type: Types.ObjectId,
        ref: "publication"
    }
}, {
    timestamps: true
});

export default model("Commentaire", commentaireSchema);
