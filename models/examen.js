import { Schema, model } from 'mongoose';

const examenSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        date: { type: Date, required: true },
        duration: { type: Number, required: true }, // Duration in minutes
        salle: { type: Schema.Types.ObjectId, ref: 'Salle', required: true },
        classe: { type: String, required: true },
        module: { type: String, required: true },
        heureDebut: { type: String, required: true },
        heureFin: { type: String, required: true },
        typeSession: { type: String, enum: ['principale', 'rattrapage'], required: true }
    },
);

export default model('Examen', examenSchema);