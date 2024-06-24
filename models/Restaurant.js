import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: false },
  available: { type: Boolean, default: false },
  capacity: { type: Number, required: true },
  availablePlaces: { type: Number, required: true },
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  // Ajoutez les champs suivants pour la capacité totale et les réservations
  totalCapacity: { type: Number },
  numberOfReservations: { type: Number, default: 0 }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
