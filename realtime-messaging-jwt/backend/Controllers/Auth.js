// filepath: /realtime-messaging-jwt/realtime-messaging-jwt/backend/Controllers/Auth.js
import ModeloUsuario from "../Models/usuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registrar = async (req, res) => {
    try {
        const { UsuarioNombre, correo, password } = req.body;

        const esExistente = await ModeloUsuario.findOne({ correo });
        if (esExistente) {
            return res.status(400).json({ success: false, message: "Usuario ya existe" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const usuarioNuevo = new ModeloUsuario({
            UsuarioNombre,
            correo,
            password: hashedPassword,
        });

        await usuarioNuevo.save();

        res.status(201).json({ success: true, message: "Usuario registrado correctamente", Usuario: usuarioNuevo });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error en el servidor" });
        console.error(error);
    }
};

const iniciarSesion = async (req, res) => {
    try {
        const { correo, password } = req.body;

        const usuario = await ModeloUsuario.findOne({ correo });
        if (!usuario) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }

        const esContrasenaValida = bcrypt.compareSync(password, usuario.password);
        if (!esContrasenaValida) {
            return res.status(401).json({ success: false, message: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ UsuarioCodigo: usuario._id }, process.env.SECRETKEY, {
            expiresIn: "1h",
        });

        res.status(200).json({ success: true, message: "Inicio de sesión exitoso", token });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error en el servidor" });
        console.error(error);
    }
};

export { registrar, iniciarSesion };