import {Schema, model } from "mongoose";

const studentSchema = new Schema({

    Nom: { 
        type: String, 
        required: true 
    }
})

export default model("student", studentSchema )