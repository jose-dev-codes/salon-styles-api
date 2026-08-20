// Importa jsonwebtoken para verificar la validez del token recibido.
import jwt from "jsonwebtoken";


export const verificarAutenticacion = (req, res, next) => {

    // Obtiene el encabezado de autorización enviado en la petición.
    const authHeader = req.headers["authorization"];

    // Verifica que exista el encabezado y que tenga el formato Bearer.
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "Acceso denegado. Encabezado de autorización ausente o mal formado."
        });
    }

    // Extrae únicamente el token del encabezado de autorización.
    const token = authHeader.split(" ")[1];

    try {
        // Verifica el token utilizando la clave secreta configurada en las variables de entorno.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Guarda los datos del usuario obtenidos del token para que estén disponibles en el siguiente middleware o controlador.
        req.usuario = decoded;

        // Permite que la petición continúe hacia el siguiente middleware o controlador.
        next();
    } catch (error) {
        // Rechaza la petición cuando el token no es válido o ya ha expirado.
        res.status(403).json({ error: "Token inválido o expirado" });
    }
};