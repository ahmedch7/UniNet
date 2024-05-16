import {Schema , model, Types} from "mongoose";

const chatSchema = new Schema({

    NomChat: String,
    NiveauEducatifId: {
        type: Types.ObjectId,
        ref: "niveauEducatif"
    }
    
})

export default model("chat", chatSchema )