import Habitacion from "../Models/habitacion.js";

// Crear una nueva sala
export async function crearHabitacion(req, res) {
  try {
    const { nombre } = req.body;
    const existe = await Habitacion.findOne({ HabitacionNombre: nombre });
    if (existe) {
      return res.status(400).json({ success: false, message: "La sala ya existe" });
    }
    const nuevaHabitacion = new Habitacion({ HabitacionNombre: nombre });
    await nuevaHabitacion.save();
    res.status(201).json({ success: true, habitacion: nuevaHabitacion });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al crear la sala" });
  }
}

// Listar todas las salas
export async function listarHabitaciones(req, res) {
  try {
    const habitaciones = await Habitacion.find().sort({ HabitacionFechaCreacion: 1 });
    res.status(200).json({ success: true, habitaciones });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al listar las salas" });
  }
}

// Obtener información de una sala por ID
export async function obtenerHabitacionPorId(req, res) {
  try {
    const { id } = req.params;
    const habitacion = await Habitacion.findById(id).populate("HabitacionMiembros", "UsuarioNombre UsuarioCorreo");
    if (!habitacion) {
      return res.status(404).json({ success: false, message: "Sala no encontrada" });
    }
    res.status(200).json({ success: true, habitacion });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al obtener la sala" });
  }
}