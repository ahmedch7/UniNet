import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const commentaireSchema = new Schema({
    contenuCommentaire: { type: String, required: true },
    dateCommentaire: { type: Date, default: Date.now },
    userId: {
        type: Types.ObjectId,
        ref: "user"
    },
    postId: {
        type: Types.ObjectId,
        ref: "post,forum"
        
    }
}, {
    timestamps: true
});

export default model("Commentaire", commentaireSchema);
