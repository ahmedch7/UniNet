const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définition du schéma pour le rôle
const roleSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String }
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
