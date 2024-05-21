import { Schema, model } from 'mongoose';

const examenSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        date: { type: Date, required: true },
        duration: { type: Number, required: true }, // Duration in minutes
        salle: { type: Schema.Types.ObjectId, ref: 'Salle', required: true }
    },
   
);

export default model('Examen', examenSchema);