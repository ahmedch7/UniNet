import Cours from "../models/cours.js";
import { validationResult } from "express-validator";


export const createCours = async (req, res) => {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({
      validationError: validationResult(req).array()
    });
  }

  try {
    const { NomCours, Description, chapitres, classeId } = req.body;

    // Check if req.file or req.files is defined
    if (!req.file && !req.files) {
      throw new Error('No files uploaded');
    }

    // If you're expecting a single file
    const files = req.file ? [req.file] : req.files.map(file => ({
      fileType: file.mimetype.split('/')[1],
      filePath: file.path
    }));

    const parsedChapitres = JSON.parse(chapitres).map((chapitre, index) => ({
      ...chapitre,
      files: files.filter((_, fileIndex) => fileIndex === index)
    }));

    const cours = new Cours({ NomCours, Description, chapitres: parsedChapitres, classeId });
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
  
  const { id } = req.params;
    try {      
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
