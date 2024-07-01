import { Schema, model } from 'mongoose';

const salleSchema = new Schema({
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    location: { type: String, required: true },
    schedules: [{
        examen: { type: Schema.Types.ObjectId, ref: 'Examen' },
        scheduledDate: { type: Date, required: true },
        scheduledStartTime: { type: Date, required: true },
        scheduledEndTime: { type: Date, required: true },
    }]
});

export default model('Salle', salleSchema);
