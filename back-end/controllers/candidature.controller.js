import Candidature from "../models/candidature.js";
import { validationResult } from "express-validator";
import { sendNotificationEmail } from "../middlewares/mailer.js";

export const createCandidature = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { userName, phoneNumber, postId } = req.body;
    const cv_path = req.file ? req.file.path : null;

    const candidature = new Candidature({
      userName,
      phoneNumber,
      postId,
      cv_path,
    });

    await candidature.save();
    sendNotificationEmail(
      "intissar.najjar@gmail.com", // Replace with recipient email
      "New Candidature Created",
      `A new candidature by "${userName}" has been created.`
    );

    res.status(201).json(candidature);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Candidatures
export const getCandidate = async (req, res) => {
  try {
    const candidatures = await Candidature.find();
    res.status(200).json(candidatures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single Candidature
export const getCandidateById = async (req, res) => {
  try {
    const candidature = await Candidature.findById(req.params.id);
    if (!candidature)
      return res.status(404).json({ message: "Candidature not found" });
    res.status(200).json(candidature);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Candidature
export const updateCAndidate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const candidature = await Candidature.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!candidature)
      return res.status(404).json({ message: "Candidature not found" });
    res.status(200).json(candidature);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Candidature
export const deleteCandidate = async (req, res) => {
  try {
    const candidature = await Candidature.findByIdAndDelete(req.params.id);
    if (!candidature)
      return res.status(404).json({ message: "Candidature not found" });
    res.status(200).json({ message: "Candidature deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
