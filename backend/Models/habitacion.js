import mongoose from "mongoose";

const SchemaHabitacion = new mongoose.Schema({
  HabitacionNombre: { type: String, required: true, unique: true },
  HabitacionMiembros: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
  HabitacionFechaCreacion: { type: Date, default: Date.now },
 });

 
const Habitacion = mongoose.model('Habitacion', SchemaHabitacion);
export default Habitacion;