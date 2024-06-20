import { validationResult } from 'express-validator';
import Examen from '../models/examen.js';

export const createExamen = async (req, res) => {
    try {
        const examen = new Examen(req.body);
        await examen.save();
        res.status(201).json(examen);
    } catch (e) {
        console.log(e);
        res.status(500).end('Internal Server Error');
    }
};

export const getExamen = async (req, res) => {
    try {
        const examen = await Examen.findById(req.params.id).populate('salle');
        if (!examen) {
            return res.status(404).json({
                message: 'Examen not found'
            });
        }
        res.status(200).json(examen);
    } catch (e) {
        console.log(e);
        res.status(500).end('Internal Server Error');
    }
};

export const updateExamen = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({
            validationError: validationResult(req).array()
        });
    }
    try {
        const examen = await Examen.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!examen) {
            return res.status(404).json({
                message: 'Examen not found'
            });
        }
        res.status(200).json(examen);
    } catch (e) {
        console.log(e);
        res.status(500).end('Internal Server Error');
    }
};

export const deleteExamen = async (req, res) => {
    try {
        const examen = await Examen.findByIdAndDelete(req.params.id);
        if (!examen) {
            return res.status(404).json({
                message: 'Examen not found'
            });
        }
        res.status(204).end();
    } catch (e) {
        console.log(e);
        res.status(500).end('Internal Server Error');
    }
};