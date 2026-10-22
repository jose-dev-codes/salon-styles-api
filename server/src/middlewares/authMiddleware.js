// Importa jsonwebtoken para verificar la validez del token recibido.
import jwt from "jsonwebtoken";

// Importa el servicio para comprobar si el token fue revocado.
import * as authService from "../services/authServices.js";

export const verificarAutenticacion = async (req, res, next) => {
    // Obtiene el encabezado de autorización.
    const authHeader = req.headers["authorization"];

    // Verifica que exista el encabezado y tenga el formato Bearer.
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "Acceso denegado. Encabezado de autorización ausente o mal formado."
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        // Verifica el token utilizando la clave secreta configurada.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Verifica que el token tenga un identificador único.
        if (!decoded.jti) {
            return res.status(403).json({
                error: "Token inválido o sin identificador."
            });
        }

        // Comprueba mediante el servicio si el token fue revocado.
        const revocado = await authService.verificarTokenRevocado(decoded.jti);

        if (revocado) {
            return res.status(403).json({
                error: "La sesión ha sido cerrada. Inicia sesión nuevamente."
            });
        }

        req.usuario = decoded;

        next();
    } catch (error) {
        // Rechaza tokens inválidos o expirados.
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(403).json({
                error: "Token inválido o expirado."
            });
        }

        // Informa si ocurre un error inesperado al verificar la autenticación.
        return res.status(500).json({
            error: "Error interno al verificar la autenticación."
        });
    }
};
