import {Schema , model} from "mongoose";

// Définition du schéma pour l'université
const universitySchema = new Schema({
  nom: { type: String, required: true },
  adresse: { type: String, required: true },
  emailContact: { type: String, required: true },
  telephoneContact: { type: String, required: true },
});

export default model("University", universitySchema);



