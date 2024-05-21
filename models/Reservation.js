import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, default: "pending" }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
