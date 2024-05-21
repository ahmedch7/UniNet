import Cours from "../models/cours.js";

export const createCours = async (req, res) => {
    try {
      const { NomCours } = req.body;
      const cours = new Cours({ NomCours });
      await cours.save();
      res.status(201).json(cours);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

export const getCours = async (req, res) => {
    try {
      const cours = await Cours.find();
      res.status(200).json(cours);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

export const getCoursById = async (req, res) => {
    try {
      const cours = await Cours.findById(req.params.id);
      if (!cours) return res.status(404).json({ error: 'cours not found' });
      res.status(200).json(cours);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

export const updateCours = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedCours = await Cours.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedCours) return res.status(404).json({ error: 'cours not found' });
      res.status(200).json(updatedCours);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

export const deleteCours = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCours = await Cours.findByIdAndDelete(id);
      if (!deletedCours) return res.status(404).json({ error: 'Cours not found' });
      res.status(200).json({ message: 'Cours deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


