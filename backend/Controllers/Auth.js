import ModeloUsuario from "../Models/usuario.js";
  
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
 
const registrar = async (req, res) => {
    try {
      const { nombre, correo, password  } = req.body;

      const esExistente = await ModeloUsuario.findOne({ correo });
      if (esExistente) {
        return res.status(401).json({ success: false, message: "Usuario Already Exists!" });
      }
  
      const hashedPassword = bcrypt.hashSync(password, 10);
  
      const usuarioNuevo = new ModeloUsuario({
        nombre,
        correo,
        password: hashedPassword, 
      });
  
      await usuarioNuevo.save();
   
      res.status(200).json({ message: "Usuario registrado correctamente", Usuario: usuarioNuevo });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error en el servidor" });
      console.error(error);
    }
  };

const iniciarSesion = async (req, res) => {
  try {
    const { correo, password } = req.body;

    const Usuario = await ModeloUsuario.findOne({ correo });
    if (!Usuario) {
      return res.status(404).json({ success: false, message: "Usuario Does Not Exist" });
    }

    const esContrasenaValida = bcrypt.compareSync(password, Usuario.password);
    if (!esContrasenaValida) {
      return res.status(401).json({ success: false, message: "Contrasena incorrecta" });
    }

    const token = jwt.sign({ UsuarioCodigo: Usuario._id  }, process.env.SECRETKEY, {
      expiresIn: "1h",
    });

 
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, 
      sameSite:"None",
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({ success: true, message: "Inicio de sesion completado", Usuario, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error en el servidor" });
    console.error(error);
  }
};

const cerrarSesion = async (req, res) => {
  try { 
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Cierre de sesion completado" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error en el servidor" });
    console.error(error);
  }
};

 


export { registrar, iniciarSesion, cerrarSesion  };
