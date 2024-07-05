import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Définition du schéma pour l'utilisateur
const userSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Email is invalid"],
  },
  dateDeNaissance: { type: Date, required: true },
  numTel: { type: Number, required: true },
  motDePasse: { type: String, required: true },
  entreprise: { type: String },
  dateInscription: { type: Date, default: Date.now },
  derniereConnexion: { type: Date },
  role: {
    type: String,
    required: true,
    enum: ["etudiant", "responsable", "collaborateur", "admin"],
  },
  niveauxEducatif: {
    type: String,
    required: true,
    enum: ["1année", "2année", "3année"],
  },
  universiteAssociee: {
    type: Schema.Types.ObjectId,
    ref: "University",
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  validationCode: { type: String },
  validationCodeExpires: { type: Date },
  isActive: { type: Boolean, default: false },
  longLivedToken: { type: String },
  twoFactorSecret: { type: String },
  twoFactorEnabled: { type: Boolean, default: false },
  participatedEvents: [{ type: Schema.Types.ObjectId, ref: 'Event' }]

});

// Index unique sur l'email
userSchema.index({ email: 1 }, { unique: true });

// Middleware pour hacher le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre("save", async function (next) {
  if (this.isModified("motDePasse")) {
    const salt = await bcrypt.genSalt(10);
    this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
  }
  next();
});

// Méthode pour vérifier le mot de passe
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.motDePasse);
};

userSchema.methods.generateAuthToken = function (rememberMe = false) {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: rememberMe ? "7d" : "12h", // Long-lived token for 'remember me'
  });
  return token;
};

const User = model("User", userSchema);

export default User;
