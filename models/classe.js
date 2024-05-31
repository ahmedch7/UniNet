import {Schema , model, Types} from "mongoose";

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
    },
    StudentId: [{ 
        type: Types.ObjectId, 
        ref: 'student',
    }]

})

export default model("classe", classeSchema )