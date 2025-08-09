import Mensaje from "../Models/mensaje.js";

// Guardar un nuevo mensaje en la base de datos
export async function guardarMensaje({ remitenteId, contenido, salaId }) {
  const nuevoMensaje = new Mensaje({
    MensajeRemitente: remitenteId,
    MensajeContenido: contenido,
    MensajeSala: salaId,
  });
  await nuevoMensaje.save();
  // Puedes popular el remitente si lo necesitas:
  return await nuevoMensaje.populate("MensajeRemitente", "UsuarioNombre UsuarioCorreo");
}

// Obtener mensajes de una sala en orden cronológico
export async function obtenerMensajesPorSala(salaId) {
  return await Mensaje.find({ MensajeSala: salaId })
    .sort({ MensajeFechaCreacion: 1 })
    .populate("MensajeRemitente", "UsuarioNombre UsuarioCorreo");
}