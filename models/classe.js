import {Schema , model, Types} from "mongoose";

const classeSchema = new Schema({

    NomClasse: String,
    AnneUniversitaire: String,
    
    NiveauEducatifId: {
        type: Types.ObjectId,
        ref: "niveauEducatif"
    }
    
})

export default model("classe", classeSchema )