import { Schema, model, Types } from "mongoose";

const chatSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    niveauEducatifId: {
        type: Types.ObjectId,
        ref: "niveauEducatif",
        required: true
    }
});

export default model("chat", chatSchema);