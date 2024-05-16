import {Schema , model, Types} from "mongoose";

const coursSchema = new Schema({

    NomCours: String,
    NiveauEducatifId: {
        type: Types.ObjectId,
        ref: "niveauEducatif"
    }
    
})

export default model("cours", coursSchema )