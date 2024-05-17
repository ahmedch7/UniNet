const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Définition du schéma pour l'université
const universitySchema = new Schema({
  nom: { type: String, required: true },
  adresse: { type: String, required: true },
  emailContact: { type: String, required: true },
  telephoneContact: { type: String, required: true },
});

const University = mongoose.model("University", universitySchema);

module.exports = University;
