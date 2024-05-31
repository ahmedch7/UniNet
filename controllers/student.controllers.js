import Student from "../models/student.js";
import { validationResult } from "express-validator";


export const createStudent = async (req, res) => {
  if(!validationResult(req).isEmpty()){
    return res.status(400).json({
        validationError: validationResult(req).array()
    });
  }
    try {
      const student = new Student(req.body)
      await student.save();
      res.status(201).json(student);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};