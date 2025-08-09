const mongoose = require('mongoose');

const SchemaMensaje = new mongoose.Schema({
  MensajeRemitente: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  MensajeContenido: { type: String, required: true },
  MensajeFechaCreacion: { type: Date, default: Date.now },
  MensajeSala: { type: mongoose.Schema.Types.ObjectId, ref: 'Habitacion' }
});

module.exports = mongoose.model('Mensaje', SchemaMensaje);