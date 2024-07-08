import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    examen: {
        type: Schema.Types.ObjectId,
        ref: 'Examen'
    },
    scheduledDate: {
        type: Date,
        required: true
    },
    scheduledStartTime: {
        type: Date,
        required: true
    },
    scheduledEndTime: {
        type: Date,
        required: true
    }
});

const salleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    capacity: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    schedules: [scheduleSchema]
});

const Salle = mongoose.model('Salle', salleSchema);

export default Salle;
