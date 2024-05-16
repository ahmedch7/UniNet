import {Schema , model} from "mongoose";

const niveauEducatifScheme = new Schema({

    NomNiveau: String,
    
})

export default model("niveauEducatif", niveauEducatifScheme )