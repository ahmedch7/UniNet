import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const postSchema = new Schema({
    contenuPost: { type: String, required: true },
    userId: { type: Types.ObjectId, required: true, ref: 'user' },
}, {
    timestamps: true
});

export default model('Post', postSchema);
