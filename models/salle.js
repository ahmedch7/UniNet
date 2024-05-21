import { Schema, model } from 'mongoose';

const salleSchema = new Schema(
    {
        name: { type: String, required: true },
        capacity: { type: Number, required: true },
        location: { type: String, required: true },
    }
);

export default model('Salle', salleSchema);