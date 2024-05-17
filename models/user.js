const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  dateInscription: { type: Date, default: Date.now },
  derniereConnexion: { type: Date },
  role: { type: Schema.Types.ObjectId, ref: "Role", required: true },
  universiteAssociee: {
    type: Schema.Types.ObjectId,
    ref: "University",
    required: true,
  },
});



const User = mongoose.model("User", userSchema);

module.exports = User;
