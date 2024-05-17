const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date, required: true },
    statut: { type: String, enum: ['en attente', 'approuvé', 'rejeté'], default: 'en attente' },
    étudiant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    foyer: { type: mongoose.Schema.Types.ObjectId, ref: 'Foyer', required: true }
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
