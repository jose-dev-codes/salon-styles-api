// Importa el pool de conexiones para realizar consultas a PostgreSQL.
import pool from "../config/db.js";

// Busca un usuario mediante su correo electrónico.
export const obtenerUsuarioPorCorreo = async (correo) => {
    const result = await pool.query(
        `
        SELECT
            id_usuario,
            nombres,
            apellidos,
            correo,
            contrasena,
            numero_telefono,
            fecha_nacimiento
        FROM usuarios
        WHERE correo = $1
        `,
        [correo]
    );

    return result.rows[0];
};