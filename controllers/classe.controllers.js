import Classe from "../models/classe.js"

export const createClasse = async (req, res) => {
    try {
      const { NomClasse, AnneUniversitaire } = req.body;
      const classe = new Classe({ NomClasse, AnneUniversitaire });
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
      if (!classe) return res.status(404).json({ error: 'classe not found' });
      res.status(200).json(classe);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  export const updateClasse = async (req, res) => {
    try {
      const { id } = req.params;
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
