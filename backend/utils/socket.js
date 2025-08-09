import { Server } from "socket.io";
import { guardarMensaje } from "../Controllers/MensajeController.js";
import { agregarUsuario, eliminarUsuario, obtenerUsuarioPorSocket } from "./users.js";

let io;

export const inicializarSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // Ajusta según tu frontend
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    // Unirse a una sala
    socket.on("joinRoom", ({ usuarioId, salaId }) => {
      socket.join(salaId);
      agregarUsuario({ socketId: socket.id, usuarioId, salaId });
      io.to(salaId).emit("userJoined", { usuarioId });
    });

    // Enviar mensaje
    socket.on("sendMessage", async (data) => {
      // data: { contenido, salaId, remitenteId }
      const mensajeGuardado = await guardarMensaje(data);
      io.to(data.salaId).emit("newMessage", mensajeGuardado);
    });

    // Desconexión
    socket.on("disconnect", () => {
      const usuario = obtenerUsuarioPorSocket(socket.id);
      if (usuario) {
        eliminarUsuario(socket.id);
        io.to(usuario.salaId).emit("userLeft", { usuarioId: usuario.usuarioId });
      }
    });
  });
};

export {io}