import { Schema, model, Types } from "mongoose";

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
    chapitres: [
        {
            titre: {
                type: String,
                required: true
            },
            files: [
                {
                    fileType: {
                        type: String,
                        enum: ["word", "excel", "pdf"]
                    },
                    filePath: {
                        type: String
                    }
                }
            ]
        }
    ],
    classeId: {
        type: Types.ObjectId,
        ref: "classe",
        required: true
    }
});

export default model("cours", coursSchema);
