const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    description: { type: String, required: true },
    image: { type: String },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true }
});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
