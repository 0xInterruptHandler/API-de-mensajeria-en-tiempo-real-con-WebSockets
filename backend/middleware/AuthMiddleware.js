import jwt from 'jsonwebtoken'
import ModeloUsuario from '../Models/usuario.js'

// Middleware para rutas HTTP: verifica JWT en cookies o cabecera Authorization
export const verificarUsuario = async (req, res, next) => {
  try {
    let token = req.cookies?.token

    // Permitir también por cabecera Authorization: Bearer <token>
    if (!token && req.headers.authorization) {
      const parts = req.headers.authorization.split(' ')
      if (parts.length === 2 && parts[0] === 'Bearer') {
        token = parts[1]
      }
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Token no proporcionado" })
    }

    const decodificado = jwt.verify(token, process.env.SECRETKEY)
    const usuario = await ModeloUsuario.findById(decodificado.UsuarioCodigo)
    if (!usuario) {
      return res.status(401).json({ success: false, message: "Usuario no válido" })
    }

    req.Usuario = usuario
    next()
  } catch (error) {
    res.status(401).json({ success: false, message: "Token inválido o expirado" })
  }
}

// Middleware para Socket.IO: verifica JWT en socket.handshake.auth.token
export const verificarSocket = async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token
    if (!token) {
      return next(new Error("Token no proporcionado"))
    }

    const decodificado = jwt.verify(token, process.env.SECRETKEY)
    const usuario = await ModeloUsuario.findById(decodificado.UsuarioCodigo)
    if (!usuario) {
      return next(new Error("Usuario no válido"))
    }

    socket.usuario = usuario // Puedes acceder como socket.usuario en los eventos
    next()
  } catch (error) {
    next(new Error("Token inválido o expirado"))
  }
}