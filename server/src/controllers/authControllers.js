// Importa el servicio de autenticación para validar las credenciales del usuario.
import * as authService from "../services/authServices.js";

// Importa jsonwebtoken para generar el token de autenticación.
import jwt from "jsonwebtoken";

// Importa randomUUID para generar un identificador único para cada token.
import { randomUUID } from "node:crypto";

export const login = async (req, res) => {
    // Obtiene el correo y la contraseña enviados en el cuerpo de la petición.
    const { correo, contrasena } = req.body;

    try {
        // Verifica que se hayan enviado ambos campos antes de continuar.
        if (!correo || !contrasena) {
            return res.status(400).json({ error: "El correo y la contraseña son obligatorios." });
        }

        // Envía las credenciales al servicio para comprobar si son correctas.
        const usuario = await authService.validarCredenciales(
            correo, contrasena
        );

        // Si las credenciales no coinciden, se rechaza el acceso.
        if (!usuario) return res.status(401).json({ error: "Credenciales incorrectas." });

        // Genera un token JWT con la identificación y el correo del usuario.
        const token = jwt.sign(
            {
                id: usuario.usuario.id_usuario,
                correo: usuario.usuario.correo,
                jti: randomUUID()
            },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        // Devuelve los datos del usuario y el token generado.
        return res.status(200).json({
            usuario: usuario.usuario,
            token: `Bearer ${token}`
        });

    } catch (error) {
        // Responde con un error interno si ocurre un problema durante el proceso.
        res.status(500).json({ error: "Error interno del servidor." });
    }
};

export const logout = async (req, res) => {
    try {
        // Obtiene el identificador y la fecha de expiración del token autenticado.
        const { jti, exp } = req.usuario;

        // Verifica que el token contenga los datos necesarios para revocarlo.
        if (!jti || !exp) {
            return res.status(400).json({
                error: "El token no contiene los datos necesarios para cerrar sesión."
            });
        }

        // Registra el token como revocado mediante el servicio de autenticación.
        await authService.cerrarSesion(jti, new Date(exp * 1000));

        return res.status(200).json({
            mensaje: "Sesión cerrada correctamente."
        });

    } catch (error) {
        // Responde con un error interno si ocurre un problema durante el proceso.
        return res.status(500).json({
            error: "Error interno del servidor."
        });
    }
};
