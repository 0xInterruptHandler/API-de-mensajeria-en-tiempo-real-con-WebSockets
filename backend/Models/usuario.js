const mongoose = require('mongoose');

const SchemaUsuario = new mongoose.Schema({
 
    UsuarioNombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    password: { type: String, required: true },  
 
    FechaCreacion: { type: Date, default: Date.now }
});

export const ModeloUsuario =  mongoose.model('Usuario', SchemaUsuario);

export default ModeloUsuario;