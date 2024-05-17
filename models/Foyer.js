const mongoose = require('mongoose');

const foyerSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    nombrePlacesMax: { type: Number, required: true },
    nombrePlacesDisponibles: { type: Number, required: true }
});

const Foyer = mongoose.model('Foyer', foyerSchema);
module.exports = Foyer;
