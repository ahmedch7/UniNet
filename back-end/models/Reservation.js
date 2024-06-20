import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  userName: { type: String, required: true }, 
    places: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;