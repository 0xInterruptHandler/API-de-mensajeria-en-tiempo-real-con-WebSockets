// app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Rutas
import AuthRutas from "./Routes/AuthRutas.js";
import HabitacionRutas from "./Routes/HabitacionRutas.js";
import MensajeRutas from "./Routes/MensajeRutas.js";

// Configuración de variables de entorno
dotenv.config();

const app = express();

// Middlewares globales
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*", // Ajustar según frontend
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rutas API
app.use("/api/auth", AuthRutas);
app.use("/api/habitaciones", HabitacionRutas);
app.use("/api", MensajeRutas);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ success: true, message: "Servidor backend activo" });
});

export default app;
