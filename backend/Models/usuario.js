const mongoose = require('mongoose');

const SchemaUsuario = new mongoose.Schema({
 
    UsuarioNombre: { type: String, required: true },
    UsuarioCorreo: { type: String, required: true, unique: true },
    UsuarioPassword: { type: String, required: true },  
 
    UsuarioFechaCreacion: { type: Date, default: Date.now }
});

export const ModeloUsuario =  mongoose.model('Usuario', SchemaUsuario);

export default ModeloUsuario;