import { Schema, model } from "mongoose";

// Définition du schéma pour l'utilisateur
const userSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateDeNaissance: { type: Date, required: true},
  numTel: { type: Number, required: true},
  motDePasse: { type: String, required: true },
  entreprise:{ type: String},
  dateInscription: { type: Date, default: Date.now },
  derniereConnexion: { type: Date },
  role: {
    type: String,
    required: true,
    enum: ["etudiant", "responsable","collaborateur", "admin"],
  },
  universiteAssociee: {
    type: Schema.Types.ObjectId,
    ref: "University",
    required: true,
  },
});

export default model("User", userSchema);

