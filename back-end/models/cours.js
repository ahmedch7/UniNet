import { Schema, model, Types } from "mongoose";

const fileSchema = new Schema({
    name: { type: String, required: true },
    path: { type: String, required: true }
  });

const coursSchema = new Schema({
    NomCours: { 
        type: String, 
        required: true 
    },
    Description: { 
        type: String, 
        required: true 
    },
    Datepub: {
        type: Date,
        default: Date.now
    },
    files: [fileSchema],
    classeId: {
        type: Types.ObjectId,
        ref: "classe",
        required: true
    }
});

export default model("cours", coursSchema);
