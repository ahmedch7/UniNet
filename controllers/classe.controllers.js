import Classe from "../models/classe.js"
import Student from "../models/student.js";
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
    const classes = await Classe.find({ NiveauEducatifId: req.params.id });
    if (!classes.length) {
      return res.status(404).json({ message: 'No classes found for this NiveauEducatif' });
    }
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudentsByClasse = async (req, res) => {
  try {
    const classe = await Classe.findById(req.params.id).populate('StudentId');
    if (!classe) {
      return res.status(404).json({ message: 'Classe not found' });
    }
    const students = classe.StudentId;
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const assignStudentsToClass = async (req, res) => {
  const { studentIds } = req.body;
  const { id } = req.params;

 
  if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
    return res.status(400).json({ message: 'Invalid student IDs' });
  }

  try {
    
    const validStudents = await Student.find({ '_id': { $in: studentIds } });
    if (validStudents.length !== studentIds.length) {
      return res.status(400).json({ message: 'One or more student IDs are invalid' });
    }


    const existingClasses = await Classe.find({ 'StudentId': { $in: studentIds } });
    const existingStudentIds = new Set();
    existingClasses.forEach(classe => {
      classe.StudentId.forEach(studentId => existingStudentIds.add(studentId.toString()));
    });

    const newStudentIds = studentIds.filter(studentId => !existingStudentIds.has(studentId));

    if (newStudentIds.length === 0) {
      return res.status(400).json({ message: 'All students are already assigned to a class' });
    }

    const updatedClass = await Classe.findByIdAndUpdate(
      id,
      { $addToSet: { StudentId: { $each: newStudentIds } } },
      { new: true, runValidators: true }
    );

    if (!updatedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUnassignedStudents = async (req, res) => {
  try {
  
    const classes = await Classe.find({}, 'StudentId');
    const assignedStudentIds = new Set();

    classes.forEach(classe => {
      classe.StudentId.forEach(studentId => assignedStudentIds.add(studentId.toString()));
    });


    const allStudents = await Student.find();


    const unassignedStudents = allStudents.filter(student => !assignedStudentIds.has(student._id.toString()));

    res.status(200).json(unassignedStudents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};