// Arreglo en memoria que almacena los usuarios conectados al chat
const users = [];

/**
 * Agrega un usuario al arreglo de usuarios cuando se une a una sala.
 * 
 * @param {string} id - ID único del socket (cliente).
 * @param {string} username - Nombre del usuario.
 * @param {string} room - Nombre de la sala de chat.
 * @returns {Object} Objeto del usuario creado.
 */
function userJoin(id, username, room) {
    const user = { id, username, room };
    users.push(user);
    return user;
}

/**
 * Obtiene el usuario actual a partir de su ID de socket.
 * 
 * @param {string} id - ID del socket.
 * @returns {Object|undefined} El usuario si existe, undefined si no se encuentra.
 */
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

/**
 * Elimina un usuario del arreglo cuando abandona el chat.
 * 
 * @param {string} id - ID del socket.
 * @returns {Object|undefined} El usuario eliminado, o undefined si no se encontró.
 */
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        // splice devuelve un array, por eso accedemos a la primera posición
        return users.splice(index, 1)[0];
    }
    return undefined;
}

/**
 * Obtiene todos los usuarios que están en una sala específica.
 * 
 * @param {string} room - Nombre de la sala.
 * @returns {Array<Object>} Lista de usuarios en la sala.
 */
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

// Exportar funciones para uso en otros módulos
module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};
