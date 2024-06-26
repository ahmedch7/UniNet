import { validationResult } from 'express-validator';
import Examen from '../models/examen.js';

import { addSchedule } from './salleController.js'; // Importation nommée correcte

// Fonction pour vérifier la disponibilité de la salle
async function salleDispo(salleId, heureDebut, heureFin) {
    try {
        const verifierSalle = await Examen.findOne({
            salle: salleId,
            $or: [
                { heureDebut: { $lt: heureFin }, heureFin: { $gt: heureDebut } },
                { heureDebut: { $gte: heureDebut, $lt: heureFin } },
                { heureFin: { $gt: heureDebut, $lte: heureFin } }
            ]
        });

        return !verifierSalle; // Retourne vrai si la salle est disponible, faux sinon
    } catch (error) {
        console.error("Erreur lors de la vérification de la disponibilité de la salle :", error);
        return false;
    }
}

export const createExamen = async (req, res) => {
    const { title, description, date, duration, classe, module, heureDebut, heureFin, typeSession, salleId } = req.body;

    try {
        // Validation de la date de l'examen
        const currentDate = new Date();
        const examDate = new Date(date);
        const sevenDaysFromNow = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

        if (examDate <= sevenDaysFromNow) {
            return res.status(400).json({ message: "La date de l'examen doit être supérieure à la date actuelle de 7 jours." });
        }

        // Vérifier la disponibilité de la salle
        const disponible = await salleDispo(salleId, heureDebut, heureFin);
        if (!disponible) {
            return res.status(409).json({ message: "La salle n'est pas disponible pour cette période." });
        }

        // Créer un nouvel examen
        const examen = new Examen({
            title,
            description,
            date,
            duration,
            salle: salleId,
            classe,
            module,
            heureDebut,
            heureFin,
            typeSession
        });

        // Sauvegarder l'examen dans la base de données
        await examen.save();
        // Ajouter l'examen au planning de la salle
        const schedule = {
            date,
            duration,
            classe,
            module,
            heureDebut,
            heureFin,
            typeSession
        };
        await addSchedule(salleId, schedule);
        // Répondre avec l'examen créé
        res.status(201).json(examen);
    } catch (error) {
        console.error('Erreur lors de la création de l\'examen :', error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'examen.' });
    }
};

export const getExamen = async (req, res) => {
    try {
        const examen = await Examen.findById(req.params.id).populate('salle');
        if (!examen) {
            return res.status(404).json({
                message: 'Examen not found'
            });
        }
        res.status(200).json(examen);
    } catch (e) {
        console.log(e);
        res.status(500).end('Internal Server Error');
    }
};

export const updateExamen = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({
            validationError: validationResult(req).array()
        });
    }
    try {
        const examen = await Examen.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!examen) {
            return res.status(404).json({
                message: 'Examen not found'
            });
        }
        res.status(200).json(examen);
    } catch (e) {
        console.log(e);
        res.status(500).end('Internal Server Error');
    }
};

export const deleteExamen = async (req, res) => {
    try {
        const examen = await Examen.findByIdAndDelete(req.params.id);
        if (!examen) {
            return res.status(404).json({
                message: 'Examen not found'
            });
        }
        res.status(204).end();
    } catch (e) {
        console.log(e);
        res.status(500).end('Internal Server Error');
    }
};
