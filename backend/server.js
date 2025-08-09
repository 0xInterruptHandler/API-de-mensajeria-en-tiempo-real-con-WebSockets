// server.js
import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
import { inicializarSocket } from "./utils/socket.js";
import conectarDB from "./utils/db.js";

dotenv.config();

// Conexión a la base de datos
conectarDB();

// Crear servidor HTTP
const server = http.createServer(app);

// Inicializar Socket.IO
inicializarSocket(server);

// Puerto de escucha
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
