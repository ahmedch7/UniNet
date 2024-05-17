const Foyer = require('../models/Foyer');
const Reservation = require('../models/Reservation');

exports.getFoyers = async (req, res) => {
    try {
        const foyers = await Foyer.find();
        res.json(foyers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createFoyer = async (req, res) => {
    const { nom, nombrePlacesMax } = req.body;

    try {
        const newFoyer = new Foyer({
            nom,
            nombrePlacesMax,
            nombrePlacesDisponibles: nombrePlacesMax
        });

        const savedFoyer = await newFoyer.save();
        res.status(201).json(savedFoyer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAvailablePlaces = async (req, res) => {
    try {
        const foyers = await Foyer.find();
        const availablePlaces = foyers.map(foyer => ({
            nom: foyer.nom,
            nombrePlacesDisponibles: foyer.nombrePlacesDisponibles
        }));
        res.json(availablePlaces);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
