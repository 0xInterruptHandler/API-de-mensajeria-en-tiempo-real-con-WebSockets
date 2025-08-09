// Importar la librería 'moment' para formateo de fechas
const moment = require("moment");

/**
 * Formatea un mensaje para enviarlo a los clientes del chat.
 * 
 * @param {string} username - Nombre del usuario que envía el mensaje.
 * @param {string} text - Contenido del mensaje.
 * @returns {Object} Objeto con el nombre de usuario, el mensaje y la hora formateada.
 */
function formatMessage(username, text) {
    return {
        username: username,
        text: text,
        time: moment().format("h:mm a") // Ejemplo: 3:45 pm
    };
}

// Exportar la función para ser utilizada en otros módulos
module.exports = formatMessage;
