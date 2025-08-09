import express from "express";
import { registrar, iniciarSesion, cerrarSesion } from "../Controllers/AuthController.js";

const router = express.Router();

// Ruta para registrar usuario
router.post("/register", registrar);

// Ruta para iniciar sesión
router.post("/login", iniciarSesion);

// Ruta para cerrar sesión
router.post("/logout", cerrarSesion);

export default router;