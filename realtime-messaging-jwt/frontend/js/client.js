// filepath: /realtime-messaging-jwt/realtime-messaging-jwt/frontend/js/client.js
// Obtener elementos del DOM
const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

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

// Evento de envío del formulario de registro
registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = e.target.elements.username.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    alert(data.message);
});

// Evento de envío del formulario de inicio de sesión
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    alert(data.message);
});

// Función para renderizar un mensaje en el DOM
function renderizarMensaje(message) {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `
        <p class="meta">${message.username}<span> ${message.time}</span></p>
        <p class="text">${message.text}</p>
    `;
    chatMessages.appendChild(div);
}

// Función para mostrar el nombre de la sala en el DOM
function mostrarNombreSala(room) {
    roomName.textContent = room;
}

// Función para mostrar la lista de usuarios conectados en el DOM
function mostrarUsuarios(users) {
    userList.innerHTML = ''; // Limpiar lista actual
    users.forEach(({ username }) => {
        const li = document.createElement('li');
        li.textContent = username;
        userList.appendChild(li);
    });
}

// Confirmación al usuario antes de salir de la sala
document.getElementById('leave-btn').addEventListener('click', () => {
    const confirmacion = confirm('¿Estás seguro de que deseas salir de la sala de chat?');
    if (confirmacion) {
        window.location = '../index.html'; // Redirige al inicio
    }
});