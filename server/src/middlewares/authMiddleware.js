// Importa jsonwebtoken para verificar la validez del token recibido.
import jwt from "jsonwebtoken";

export const verificarAutenticacion = (req, res, next) => {
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

        req.usuario = decoded;

        next();
    } catch (error) {
        // Rechaza tokens inválidos o expirados.
        res.status(403).json({ error: "Token inválido o expirado." });
    }
};
