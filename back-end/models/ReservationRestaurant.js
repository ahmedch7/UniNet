import mongoose from 'mongoose';

const reservationRestaurantSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  userName: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const ReservationRestaurant = mongoose.model('ReservationRestaurant', reservationRestaurantSchema);

export default ReservationRestaurant;
