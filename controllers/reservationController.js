const Reservation = require('../models/Reservation');
const Foyer = require('../models/Foyer');

exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('étudiant').populate('foyer');
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createReservation = async (req, res) => {
    const { dateDebut, dateFin, étudiant, foyer } = req.body;

    try {
        const foyerData = await Foyer.findById(foyer);
        if (foyerData.nombrePlacesDisponibles < 1) {
            return res.status(400).json({ message: 'No available places in the foyer' });
        }

        const newReservation = new Reservation({
            dateDebut,
            dateFin,
            étudiant,
            foyer
        });

        foyerData.nombrePlacesDisponibles -= 1;
        await foyerData.save();

        const savedReservation = await newReservation.save();
        res.status(201).json(savedReservation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateReservationStatus = async (req, res) => {
    const { id } = req.params;
    const { statut } = req.body;

    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(id, { statut }, { new: true });
        res.json(updatedReservation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
