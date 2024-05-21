import niveauEducatif from "../models/niveauEducatif.js";

export const createNiveau = async (req, res) => {
    try {
      const { NomNiveau } = req.body;
      const niveau = new niveauEducatif({ NomNiveau});
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

export const updateNiveauEdu = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedNiv = await niveauEducatif.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedNiv) return res.status(404).json({ error: 'Niveau Educatif not found' });
      res.status(200).json(updatedNiv);
    } catch (error) {
      res.status(400).json({ error: error.message });
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
  


