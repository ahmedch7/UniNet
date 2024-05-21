import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;
