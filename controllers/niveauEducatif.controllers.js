import niveauEducatif from "../models/niveauEducatif.js";
import { validationResult } from "express-validator";


export const createNiveau = async (req, res) => {
  if(!validationResult(req).isEmpty()){
    return res.status(400).json({
        validationError: validationResult(req).array()
    });
  }
    try {
      const niveau = new niveauEducatif(req.body)
      await niveau.save();
      res.status(201).json(niveau);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};


export const getNiveau = async (req, res) => {
    try {
      const niveaux = await niveauEducatif.find();
      res.status(200).json(niveaux);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

export const getNiveauById = async (req, res) => {
    try {
      const niveau = await niveauEducatif.findById(req.params.id);
      if (!niveau) return res.status(404).json({ error: 'Niveau educatif not found' });
      res.status(200).json(niveau);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

export const updateNiveauEdu = async(req, res) => {
  const { id } = req.params;
  const { NomNiveau } = req.body

    try {
      const updatedniveau= await niveauEducatif.findByIdAndUpdate(id, { NomNiveau },{ new: true })
      console.log(id);
      res.status(200).json(updatedniveau)

    } catch (error) {
      console.log(error)
      res.status(500).end("Internal Server Error")

    }
  };

export const deleteNivEdu = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedNiv = await niveauEducatif.findByIdAndDelete(id);
      if (!deletedNiv) return res.status(404).json({ error: 'Niveau Educatif not found' });
      res.status(200).json({ message: 'Niveau Educatif deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
