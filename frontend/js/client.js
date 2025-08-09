// Obtener elementos del DOM
const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Obtener el nombre de usuario y la sala desde los parámetros de la URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true, // Elimina el '?' del inicio de la query string
});

console.log(`Usuario: ${username} | Sala: ${room}`);

// Inicializar la conexión con el servidor usando Socket.io
const socket = io();

// Emitir evento para unirse a la sala
socket.emit("joinRoom", { username, room });

// Escuchar evento que devuelve info de la sala y usuarios conectados
socket.on("roomUsers", ({ room, users }) => {
    mostrarNombreSala(room);
    mostrarUsuarios(users);
});

// Escuchar mensajes desde el servidor
socket.on("message", (message) => {
    console.log("Mensaje recibido:", message);
    renderizarMensaje(message);

    // Hacer scroll automático al último mensaje
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Evento de envío del formulario de chat
chatForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const input = e.target.elements.msg;
    const mensaje = input.value.trim();

    if (mensaje === "") return; // Evita enviar mensajes vacíos

    // Emitir mensaje al servidor
    socket.emit("chatMessage", mensaje);

    // Limpiar y enfocar el input
    input.value = "";
    input.focus();
});

/**
 * Renderiza un mensaje en el DOM
 * @param {Object} message - Objeto con username, time y text
 */
function renderizarMensaje(message) {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `
        <p class="meta">${message.username}<span> ${message.time}</span></p>
        <p class="text">${message.text}</p>
    `;
    chatMessages.appendChild(div);
}

/**
 * Muestra el nombre de la sala en el DOM
 * @param {string} room - Nombre de la sala
 */
function mostrarNombreSala(room) {
    roomName.textContent = room;
}

/**
 * Muestra la lista de usuarios conectados en el DOM
 * @param {Array} users - Lista de objetos { username }
 */
function mostrarUsuarios(users) {
    userList.innerHTML = ''; // Limpiar lista actual
    users.forEach(({ username }) => {
        const li = document.createElement('li');
        li.textContent = username;
        userList.appendChild(li);
    });
}

/**
 * Confirmación al usuario antes de salir de la sala
 */
document.getElementById('leave-btn').addEventListener('click', () => {
    const confirmacion = confirm('¿Estás seguro de que deseas salir de la sala de chat?');
    if (confirmacion) {
        window.location = '../index.html'; // Redirige al inicio
    }
});
