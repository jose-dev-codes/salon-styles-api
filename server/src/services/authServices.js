import pool from "../config/db.js";

export const validarCredenciales = async (correo, contrasena) => {
    try {
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

        if (result.rows.length === 0) {
            return null;
        }

        const usuario = result.rows[0];

        if (usuario.contrasena !== contrasena) {
            return null;
        }

        return {
            usuario: {
                id_usuario: usuario.id_usuario,
                nombres: usuario.nombres,
                apellidos: usuario.apellidos,
                correo: usuario.correo,
                numero_telefono: usuario.numero_telefono,
                fecha_nacimiento: usuario.fecha_nacimiento
            }
        };
    } catch (error) {
        throw new Error(
            "Error en la base de datos durante la autenticación:",
            { cause: error }
        );
    }
};