// filepath: /realtime-messaging-jwt/realtime-messaging-jwt/backend/Routes/Auth.js
import express from 'express';
import { registrar, iniciarSesion } from '../Controllers/Auth.js';

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registrar);

// Ruta para iniciar sesión
router.post('/login', iniciarSesion);

export default router;