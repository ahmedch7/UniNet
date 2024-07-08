
import Examen from '../models/examen.js';
import Salle from '../models/salle.js';



//==============================================
// Fonction pour créer un nouvel examen
//==============================================
export const createExamen = async (req, res) => {
    try {
      const { date, heureDebut, heureFin } = req.body;
  
      // Convertir heureDebut en objet Date
      const startDateTime = new Date(`${date}T${heureDebut}`);
  
      // Convertir heureFin en objet Date
      const endDateTime = new Date(`${date}T${heureFin}`);
  
      // Vérification que la date est > 7 jours de la date courante
      const today = new Date();
      const minDate = new Date(today.setDate(today.getDate() + 7));
      const examenDate = new Date(date);
      if (examenDate < minDate) {
        return res.status(400).json({ error: 'La date doit être au moins 7 jours dans le futur.' });
      }
  
      // Vérification que date fin > date début
      if (endDateTime <= startDateTime) {
        return res.status(400).json({ error: "L'heure de fin doit être supérieure à l'heure de début." });
      }
  
      // Calcul dynamique de la durée en minutes
      const duration = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60);
  
      // Création de l'objet Examen
      const examen = new Examen({
        ...req.body,
        heureDebut: startDateTime,
        heureFin: endDateTime,
        duration: duration
      });
  
      // Sauvegarde de l'examen
      await examen.save();
      res.status(201).json(examen);
    } catch (error) {
      if (error.name === 'ValidationError') {
        const errors = Object.keys(error.errors).map(key => error.errors[key].message);
        res.status(400).json({ errors });
      } else {
        res.status(500).json({ error: 'Erreur serveur.' });
      }
    }
  };
  
//===================================================
// Fonction pour mettre à jour un examen existant
//===================================================
export const updateExamen = async (req, res) => {
    try {
        const { id } = req.params;
        const { heureDebut, heureFin, ...otherFields } = req.body;

        // Convertir les entrées "HH:mm" en objets Date
        const heureDebutParts = heureDebut.split(':');
        const heureFinParts = heureFin.split(':');

        const date = new Date(); // Utiliser la date actuelle ou une date spécifique
        date.setHours(parseInt(heureDebutParts[0], 10), parseInt(heureDebutParts[1], 10), 0, 0);
        const heureDebutDate = new Date(date);

        date.setHours(parseInt(heureFinParts[0], 10), parseInt(heureFinParts[1], 10), 0, 0);
        const heureFinDate = new Date(date);

        const updatedExamen = await Examen.findByIdAndUpdate(id, {
            ...otherFields,
            heureDebut: heureDebut,
            heureFin: heureFin,
        }, { new: true });

        if (!updatedExamen) {
            throw new Error('Examen not found');
        }

        res.status(200).json(updatedExamen);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
//===================================================
// Fonction pour supprimer un examen
//===================================================
export const deleteExamen = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExamen = await Examen.findByIdAndDelete(id);
        if (!deletedExamen) {
            throw new Error('Examen not found');
        }
        res.status(200).json(deletedExamen);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
//===================================================
// Fonction pour rechercher un examen par ID
//===================================================
export const getExamenById = async (req, res) => {
    try {
        const { id } = req.params;
        const examen = await Examen.findById(id);
        if (!examen) {
            throw new Error('Examen not found');
        }
        res.status(200).json(examen);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
//===================================================
// Fonction pour afficher tous les examens
//===================================================
export const getAllExamens = async (req, res) => {
    try {
        const examens = await Examen.find();
        res.status(200).json(examens);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
//===================================================================
// Fonction pour affecter un examen à une salle à une date choisie
//===================================================================
export const affecterExamenSalle = async (req, res) => {
    try {
        const { salleName } = req.body;
        const { title, description, date, heureDebut, heureFin, classe, module, typeSession } = req.body;

        // Trouver la salle par nom
        const salle = await Salle.findOne({ name: salleName });
        if (!salle) {
            throw new Error('Salle not found');
        }

        // Vérifier la disponibilité de la salle pour l'examen à la date et heure spécifiées
        const isAvailable = salle.schedules.every(schedule => {
            const scheduledStartTime = new Date(schedule.scheduledStartTime);
            const scheduledEndTime = new Date(schedule.scheduledEndTime);
            const newStartTime = new Date(date + 'T' + heureDebut);
            const newEndTime = new Date(date + 'T' + heureFin);

            // Vérifier si les heures de début et de fin chevauchent
            return (newStartTime >= scheduledEndTime || newEndTime <= scheduledStartTime);
        });

        if (!isAvailable) {
            return res.status(400).json({ error: 'Salle not available at the specified time' });
        }

        // Calculer la durée de l'examen en minutes
        const duration = (new Date(date + 'T' + heureFin) - new Date(date + 'T' + heureDebut)) / (1000 * 60);

        // Créer l'examen et l'associer à la salle
        const nouvelExamen = new Examen({
            title,
            description,
            date: new Date(date),
            heureDebut,
            heureFin,
            duration,
            salle: salle._id, // Assurez-vous que salle._id est un ObjectId valide
            classe,
            module,
            typeSession
        });

        await nouvelExamen.save();

        // Mettre à jour la salle avec le nouvel examen programmé
        salle.schedules.push({
            examen: nouvelExamen._id,
            date: new Date(date),
            heureDebut: new Date( heureDebut),
            heureFin: new Date(heureFin),
        });

        await salle.save();

        res.status(201).json(nouvelExamen);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Fonction pour récupérer les examens par nom de salle
export const getExamensBySalleName = async (req, res) => {
    try {
        const { salleName } = req.query;

        if (!salleName) {
            throw new Error("Le nom de la salle est requis.");
        }

        const examens = await Examen.find({ salle: salleName });

        if (!examens || examens.length === 0) {
            return res.status(404).json({ message: 'Aucun examen trouvé pour cette salle.' });
        }

        res.status(200).json(examens);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//examens par salle
export const getExamensBySalle = async (req, res) => {
    try {
        const { salleId } = req.params;

        if (!salleId) {
            throw new Error("L'ID de la salle est requis.");
        }

        const examens = await Examen.find({ salle: salleId });

        if (!examens || examens.length === 0) {
            return res.status(404).json({ message: 'Aucun examen trouvé pour cette salle.' });
        }

        res.status(200).json(examens);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

