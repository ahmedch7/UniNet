import Salle from "../models/salle.js";
import Examen from '../models/examen.js';
//===================================================
// Ajouter une nouvelle salle
//===================================================
export const createSalle = async (req, res) => {
  try {
    const { name, capacity, location } = req.body;
    const newSalle = new Salle({ name, capacity, location });
    await newSalle.save();
    res.status(201).json(newSalle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//===================================================
// Mettre à jour une salle existante
//===================================================
export const updateSalle = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, capacity, location } = req.body;
    const updatedSalle = await Salle.findByIdAndUpdate(
      id,
      { name, capacity, location },
      { new: true }
    );
    if (!updatedSalle) {
      throw new Error("Salle non trouvée");
    }
    res.status(200).json(updatedSalle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//===================================================
// Rechercher une salle par ID
//===================================================
export const getSalleById = async (req, res) => {
  try {
    const { id } = req.params;
    const salle = await Salle.findById(id);
    if (!salle) {
      throw new Error("Salle non trouvée");
    }
    res.status(200).json(salle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//===================================================
// Rechercher une salle par nom
//===================================================
export const getSalleByName = async (req, res) => {
  try {
    const { name } = req.params;
    const salle = await Salle.findOne({ name });
    if (!salle) {
      throw new Error("Salle non trouvée");
    }
    res.status(200).json(salle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//===================================================
// Afficher toutes les salles
//===================================================
export const getAllSalles = async (req, res) => {
  try {
    const salles = await Salle.find();
    res.status(200).json(salles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



//===================================================
// Fonction pour supprimer une salle
//===================================================
export const deleteSalle = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSalle = await Salle.findByIdAndDelete(id);
    if (!deletedSalle) {
      throw new Error("Salle not found");
    }
    res.status(200).json(deletedSalle);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};



export const affecterExamenExistanteSalle = async (req, res) => {
    try {
        const { examenId, salleId, date, heureDebut, heureFin } = req.body;

        if (!examenId || !salleId || !date || !heureDebut || !heureFin) {
            throw new Error("Tous les champs (examenId, salleId, date, heureDebut, heureFin) sont requis.");
        }

        // Vérifier si l'examen existe
        const examen = await Examen.findById(examenId);
        if (!examen) {
            throw new Error("Examen non trouvé.");
        }

        // Vérifier si la salle existe
        const salle = await Salle.findById(salleId);
        if (!salle) {
            throw new Error("Salle non trouvée.");
        }

        // Convertir la date et les heures en objets Date pour la comparaison
        const dateRecherchee = new Date(date);
        const heureDebutRecherchee = heureDebut.split(":");
        const heureFinRecherchee = heureFin.split(":");
        dateRecherchee.setHours(
            parseInt(heureDebutRecherchee[0], 10),
            parseInt(heureDebutRecherchee[1], 10),
            0,
            0
        );
        const dateDebut = new Date(dateRecherchee);
        dateRecherchee.setHours(
            parseInt(heureFinRecherchee[0], 10),
            parseInt(heureFinRecherchee[1], 10),
            0,
            0
        );
        const dateFin = new Date(dateRecherchee);

        // Vérifier la disponibilité de la salle
        const isAvailable = salle.schedules.every(schedule => {
            const scheduledStartTime = new Date(schedule.scheduledStartTime);
            const scheduledEndTime = new Date(schedule.scheduledEndTime);
            return (dateFin <= scheduledStartTime || dateDebut >= scheduledEndTime);
        });

        if (!isAvailable) {
            return res.status(400).json({ error: 'La salle n\'est pas disponible à la date et heure spécifiées.' });
        }

        // Affecter l'examen à la salle
        examen.salle = salleId;
        examen.date = dateDebut;
        examen.heureDebut = dateDebut;
        examen.heureFin = dateFin;

        await examen.save();

        // Mettre à jour la salle avec le nouvel examen programmé
        salle.schedules.push({
            examen: examenId,
            scheduledDate: dateDebut,
            scheduledStartTime: dateDebut,
            scheduledEndTime: dateFin,
        });

        await salle.save();

        res.status(200).json(examen);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const getSallesDisponibles = async (req, res) => {
  try {
    const { date, heureDebut, heureFin } = req.query;

    if (!date || !heureDebut || !heureFin) {
      throw new Error("Tous les champs (date, heureDebut, heureFin) sont requis.");
    }

    const dateRecherchee = new Date(date);
    const heureDebutRecherchee = heureDebut.split(":");
    const heureFinRecherchee = heureFin.split(":");
    dateRecherchee.setHours(
      parseInt(heureDebutRecherchee[0], 10),
      parseInt(heureDebutRecherchee[1], 10),
      0,
      0
    );
    const dateDebut = new Date(dateRecherchee);
    dateRecherchee.setHours(
      parseInt(heureFinRecherchee[0], 10),
      parseInt(heureFinRecherchee[1], 10),
      0,
      0
    );
    const dateFin = new Date(dateRecherchee);

    const sallesDisponibles = await Salle.find({
      'schedules': {
        $not: {
          $elemMatch: {
            scheduledDate: {
              $gte: dateDebut,
              $lte: dateFin
            }
          }
        }
      }
    });

    res.status(200).json(sallesDisponibles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
