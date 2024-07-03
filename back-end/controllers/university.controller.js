import University from "../models/university.js";

export const create = async (req, res) => {
  try {
    const university = new University(req.body);
    await university.save();
    res.status(201).json(university);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUniversities = async (req, res) => {
  try {
    const universities = await University.find();
    res.status(200).json(universities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUniversityById = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university)
      return res.status(404).json({ error: "University not found" });
    res.status(200).json(university);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUniversity = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUniversity = await University.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUniversity)
      return res.status(404).json({ error: "University not found" });
    res.status(200).json(updatedUniversity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUniversity = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUniversity = await University.findByIdAndDelete(id);
    if (!deletedUniversity)
      return res.status(404).json({ error: "University not found" });
    res.status(200).json({ message: "University deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
