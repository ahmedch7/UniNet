import Forum from "../models/forum.js";
import { validationResult } from "express-validator";
import { sendNotificationEmail } from "../middlewares/mailer.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
// Create Forum
export const createForum = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { titreForum, descriptionForum, category, userId } = req.body;
    const cv_path = req.file ? req.file.path : null; // Get the file path

    const forum = new Forum({
      titreForum,
      descriptionForum,
      category,
      userId,
      cv_path,
    }); // Pass properties as an object
    await forum.save();
    sendNotificationEmail(
      "intissar.najjar@gmail.com", // Replace with recipient email
      "New Forum Created",
      `A new forum titled "${titreForum}" has been created in the "${category}" category.`
    );
    res.status(201).json(forum);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Forums
export const getForums = async (req, res) => {
  try {
    const forums = await Forum.find();
    res.status(200).json(forums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single Forum
export const getForumById = async (req, res) => {
  try {
    const forum = await Forum.findById(req.params.id);
    if (!forum) return res.status(404).json({ message: "Forum not found" });
    res.status(200).json(forum);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Forum
export const updateForum = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const forum = await Forum.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!forum) return res.status(404).json({ message: "Forum not found" });
    res.status(200).json(forum);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Forum
export const deleteForum = async (req, res) => {
  try {
    const forum = await Forum.findByIdAndDelete(req.params.id);
    if (!forum) return res.status(404).json({ message: "Forum not found" });
    res.status(200).json({ message: "Forum deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get forums by category
export const getForumsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const forums = await Forum.find({ category });
    res.status(200).json(forums);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
