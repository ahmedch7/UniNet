import pkg from 'mongoose';
const { Schema, model, models } = pkg;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define the user schema
const userSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  avatar: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Email is invalid"],
  },
  dateDeNaissance: { 
    type: Date, 
    required: true, 
    validate: {
      validator: function(value) {
        return value <= new Date();
      },
      message: "Date of birth must be in the past."
    }
  },
  numTel: { 
    type: String, 
    required: true, 
    match: [/^\d{8}$/, "Phone number is invalid"] // Example for a 10-digit phone number
  },
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
    enum: ["1année", "2année", "année"],
  },
  universiteAssociee: {
    type: Schema.Types.ObjectId,
    ref: "University",
  },
  activeStatus: { type: Boolean, default: true },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  validationCode: { type: String },
  validationCodeExpires: { type: Date },
  isActive: { type: Boolean, default: false },
  longLivedToken: { type: String },
  twoFactorSecret: { type: String },
  twoFactorEnabled: { type: Boolean, default: false },
  participatedEvents: [{ type: Schema.Types.ObjectId, ref: 'Event'}]
});

// Unique index on email
userSchema.index({ email: 1 }, { unique: true });

// Middleware to hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("motDePasse")) {
    const salt = await bcrypt.genSalt(10);
    this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
  }
  next();
});

// Method to verify the password
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.motDePasse);
};

// Method to generate an auth token
userSchema.methods.generateAuthToken = function (rememberMe = false) {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: rememberMe ? "7d" : "12h", // Long-lived token for 'remember me'
  });
  return token;
};

// Check if the model is already defined to avoid OverwriteModelError
const User = models.User || model("User", userSchema);

export default User;
