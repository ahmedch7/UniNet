import {Schema , model, Types} from "mongoose";
import Chat from './chat.js';
const classeSchema = new Schema({

    NomClasse: { 
        type: String, 
        required: true 
    },
    AnneUniversitaire: {
        type: String,
        required: true
    },
    NiveauEducatifId: {
        type: Types.ObjectId,
        ref: "niveauEducatif",
        required: true
    },
    StudentId: [{ 
        type: Types.ObjectId, 
        ref: 'student',
    }],
   
    chat :[Chat.schema]

})

export default model("classe", classeSchema )