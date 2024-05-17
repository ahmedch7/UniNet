const University = require('../models/university');

exports.createUniversity = async (req, res) => {
  try {
    const { nom, adresse, emailContact, telephoneContact } = req.body;
    const university = new University({ nom, adresse, emailContact, telephoneContact });
    await university.save();
    res.status(201).json(university);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUniversities = async (req, res) => {
  try {
    const universities = await University.find();
    res.status(200).json(universities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUniversityById = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) return res.status(404).json({ error: 'University not found' });
    res.status(200).json(university);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUniversity = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUniversity = await University.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUniversity) return res.status(404).json({ error: 'University not found' });
    res.status(200).json(updatedUniversity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUniversity = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUniversity = await University.findByIdAndDelete(id);
    if (!deletedUniversity) return res.status(404).json({ error: 'University not found' });
    res.status(200).json({ message: 'University deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
