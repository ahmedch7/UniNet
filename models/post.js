import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const postSchema = new Schema({
    contenuPost: { type: String, required: true },
    userId: { type: Types.ObjectId, required: true, ref: 'user' },
    likes: [{
        type: String,
        ref: "user"
    }],

    dislikes: [{
        type: String,
        ref: "user"
    }],
    reportCount : {type:Number, required: false}
}, {
    timestamps: true
});

export default model('Post', postSchema);
