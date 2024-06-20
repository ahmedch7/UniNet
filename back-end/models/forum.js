import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const forumSchema = new Schema({
    titreForum: { type: String, required: true },
    descriptionForum: { type: String },
    category: { type: String, required: true},
    userId: { type: Types.ObjectId, required: true, ref: 'user' },
}, {
    timestamps: true
});

export default model('Forum', forumSchema);
