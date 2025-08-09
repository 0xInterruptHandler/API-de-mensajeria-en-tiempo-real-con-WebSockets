const mongoose = require('mongoose');

const SchemaMensaje = new mongoose.Schema({
  remitente: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contenido: { type: String, required: true },
  FechaCreacion: { type: Date, default: Date.now },
  MensajeSala: { type: mongoose.Schema.Types.ObjectId, ref: 'Habitacion' }
});

module.exports = mongoose.model('Mensaje', SchemaMensaje);