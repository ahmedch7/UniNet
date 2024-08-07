import Cours from "../models/cours.js"
import { validationResult } from "express-validator";


export const createCours = async (req, res) => {
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

  const { id } = req.params;
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.files = req.file.path; // Update file path if a new file is provided
    }

    const updatedCours = await Cours.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedCours) {
      return res.status(404).json({ error: 'cours not found' });
    }

    res.status(200).json(updatedCours);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
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

export const getCoursesByClasse = async (req, res) => {
  try {
    const courses = await Cours.find({ classeId: req.params.id });
    if (!courses.length) {
      return res.status(404).json({ message: 'No courses found for this classe' });
    }
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

