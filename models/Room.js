import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  roomNumber: { type: Number, required: true },
  type: { type: String, enum: ['double', 'triple'], required: true },
  capacity: { type: Number, required: true },
  availablePlaces: { type: Number, required: true },
  foyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Foyer', required: true }
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
