import { validationResult } from 'express-validator';
import Salle from '../models/salle.js';

export const createSalle = async (req, res) => {
    
    try {
        const salle = new Salle(req.body);
        await salle.save();
        res.status(201).json(salle);
    } catch (e) {
        console.log(e);
        res.status(500).end('Internal Server Error');
    }
};

export const getSalle = async (req, res) => {
    try {
        const salle = await Salle.findById(req.params.id);
        if (!salle) {
            return res.status(404).json({
                message: 'Salle not found'
            });
        }
        res.status(200).json(salle);
    } catch (e) {
        console.log(e);
        res.status(500).end('Internal Server Error');
    }
};

export const updateSalle = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({
            validationError: validationResult(req).array()
        });
    }
    try {
        const salle = await Salle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!salle) {
            return res.status(404).json({
                message: 'Salle not found'
            });
        }
        res.status(200).json(salle);
    } catch (e) {
        console.log(e);
        res.status(500).end('Internal Server Error');
    }
};

export const deleteSalle = async (req, res) => {
    try {
        const salle = await Salle.findByIdAndDelete(req.params.id);
        if (!salle) {
            return res.status(404).json({
                message: 'Salle not found'
            });
        }
        res.status(204).end();
    } catch (e) {
        console.log(e);
        res.status(500).end('Internal Server Error');
    }
};