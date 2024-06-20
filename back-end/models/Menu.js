import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  image: { type: String, required: false },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },  
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]  
});

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;
