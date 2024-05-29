import Classe from "../models/classe.js"
import { validationResult } from "express-validator";


export const createClasse = async (req, res) => {
  if(!validationResult(req).isEmpty()){
    return res.status(400).json({
        validationError: validationResult(req).array()
    });
  }
    try {
      const classe = new Classe(req.body)
      await classe.save();
      res.status(201).json(classe);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

export const getClasse = async (req, res) => {
  try {
    const classe = await Classe.find();
    res.status(200).json(classe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getClasseById = async (req, res) => {
  try {
    const classe = await Classe.findById(req.params.id);
    if (!classe) return res.status(404).json({ error: 'Classe not found' });
    res.status(200).json(classe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

  export const updateClasse = async (req, res) => {
    if(!validationResult(req).isEmpty()){
      return res.status(400).json({
          validationError: validationResult(req).array()
      });}
    const { id } = req.params;
    try {
      const updatedClasse = await Classe.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedClasse) return res.status(404).json({ error: 'classe not found' });
      res.status(200).json(updatedClasse);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  export const deleteClasse = async (req, res) => {
    try {
        
      const { id } = req.params;
      const deletedClasse = await Classe.findByIdAndDelete(id);
      if (!deletedClasse) return res.status(404).json({ error: 'Classe not found' });
      res.status(200).json({ message: 'Classe deleted successfully' });

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

export const getClassesByNiveau = async (req, res) => {
    try {
        const classes = await Classe.find({ NiveauEducatifId: req.params.id } ).exec();
        return classes;
    } catch (error) {
        console.error("Error fetching classes:", error);
        throw error;  
    }
};

  
