import express from "express";
import { obtenerMensajesPorSala, guardarMensaje } from "../Controllers/MensajeController.js";
import { verificarUsuario } from "../middleware/AuthMiddleware.js";

const router = express.Router();

// Obtener mensajes de una sala (requiere autenticación)
router.get("/mensajes/:salaId", verificarUsuario, async (req, res) => {
  try {
    const mensajes = await obtenerMensajesPorSala(req.params.salaId);
    res.status(200).json({ success: true, mensajes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al obtener mensajes" });
  }
});

// Guardar un nuevo mensaje (requiere autenticación)
router.post("/mensajes", verificarUsuario, async (req, res) => {
  try {
    const mensaje = await guardarMensaje(req.body);
    res.status(201).json({ success: true, mensaje });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al guardar mensaje" });
  }
});

export default router;