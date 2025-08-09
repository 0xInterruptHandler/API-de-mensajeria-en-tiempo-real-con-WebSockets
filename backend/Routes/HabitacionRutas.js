import { Router } from "express";
import {
  crearHabitacion,
  listarHabitaciones,
  obtenerHabitacionPorId
} from "../Controllers/HabitacionController.js";
// Si necesitas autenticación:
// import { verificarToken } from "../middleware/AuthMiddleware.js";

const router = Router();

// Crear nueva sala
router.post("/", /* verificarToken, */ crearHabitacion);

// Listar todas las salas
router.get("/", /* verificarToken, */ listarHabitaciones);

// Obtener una sala por ID
router.get("/:id", /* verificarToken, */ obtenerHabitacionPorId);

export default router;
