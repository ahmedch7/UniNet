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
    AnneUniversitaire: {
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
                        enum: ["word", "excel", "pdf"],
                        required: true
                    },
                    filePath: {
                        type: String,
                        required: true
                    }
                }
            ]
        }
    ],
    classeId: {
        type: Types.ObjectId,
        ref: "classe"
    }
});

export default model("cours", coursSchema);
