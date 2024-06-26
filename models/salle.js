// salle.model.js
import { Schema, model } from 'mongoose';

const salleSchema = new Schema({
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    location: { type: String, required: true },
    schedules: [{
        date: { type: Date, required: true },
        duration: { type: Number, required: true },
        classe: { type: String, required: true },
        module: { type: String, required: true },
        heureDebut: { type: Date, required: true },
        heureFin: { type: Date, required: true },
        typeSession: { type: String, required: true }
    }]
});

export default model('Salle', salleSchema);
