import mongoose from 'mongoose';

const foyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: false },
  capacity: { type: Number, required: false },
  available: { type: Boolean, default: false }
});

const Foyer = mongoose.model('Foyer', foyerSchema);

export default Foyer;
