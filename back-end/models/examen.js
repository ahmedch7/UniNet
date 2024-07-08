import { Schema, model } from 'mongoose';

const examenSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: Number, required: true }, // Durée en minutes
    salle: { type: Schema.Types.ObjectId, ref: 'Salle', required: true },
    classe: { type: String, required: true },
    module: { type: String, required: true },
    heureDebut: { type: String, required: true }, // Garder comme String pour entrée "HH:mm"
    heureFin: { type: String, required: true }, // Garder comme String pour entrée "HH:mm"
    typeSession: { type: String, enum: ['principale', 'rattrapage'], required: true },
});

export default model('Examen', examenSchema);
