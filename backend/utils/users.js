// Estructura en memoria para usuarios conectados
const usuariosConectados = [];

// Agregar usuario conectado
export function agregarUsuario({ socketId, usuarioId, salaId }) {
  usuariosConectados.push({ socketId, usuarioId, salaId });
}

// Obtener usuario por socketId
export function obtenerUsuarioPorSocket(socketId) {
  return usuariosConectados.find(u => u.socketId === socketId);
}

// Eliminar usuario al desconectarse
export function eliminarUsuario(socketId) {
  const idx = usuariosConectados.findIndex(u => u.socketId === socketId);
  if (idx !== -1) usuariosConectados.splice(idx, 1);
}

// Listar usuarios en una sala
export function listarUsuariosEnSala(salaId) {
  return usuariosConectados.filter(u => u.salaId === salaId);
}