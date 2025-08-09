const mongoose = require('mongoose');

const SchemaHabitacion = new mongoose.Schema({
  HabitacionNombre: { type: String, required: true, unique: true },
  miembros: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
  FechaCreacion: { type: Date, default: Date.now },
 });

module.exports = mongoose.model('Habitacion', SchemaHabitacion);