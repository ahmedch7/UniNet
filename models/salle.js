import { Schema, model } from 'mongoose';

const examScheduleSchema = new Schema({
    date: { type: Date, required: true },
    duration: { type: Number, required: true }, // Duration in minutes
    classe: { type: String, required: true },
    module: { type: String, required: true },
    heureDebut: { type: String, required: true },
    heureFin: { type: String, required: true },
    sessionType: { type: String, required: true }


    
});

const salleSchema = new Schema(
    {
        name: { type: String, required: true },
        capacity: { type: Number, required: true },
        location: { type: String, required: true },
        schedules: [examScheduleSchema]
    }
);

export default model('Salle', salleSchema);
