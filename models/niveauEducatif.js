import {Schema, model } from "mongoose";


const niveauEducatifScheme = new Schema({

    NomNiveau: { 
        type: String, 
        required: true 
    }
    
})

export default model("niveauEducatif", niveauEducatifScheme )