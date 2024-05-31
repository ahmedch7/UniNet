import mongoose from 'mongoose';

const foyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: false },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],  
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true }  
});

const Foyer = mongoose.model('Foyer', foyerSchema);

export default Foyer;
