// Importa el pool de conexiones para realizar consultas a PostgreSQL.
import pool from "../config/db.js";

// Importa bcrypt para comparar la contraseña recibida con el hash almacenado.
import bcrypt from "bcryptjs";

export const validarCredenciales = async (correo, contrasena) => {
    try {
        // Busca el usuario mediante su correo electrónico.
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

        // Si no existe un usuario con ese correo, las credenciales no son válidas.
        if (result.rows.length === 0) {
            return null;
        }

        const usuario = result.rows[0];

        // Compara la contraseña recibida con el hash almacenado en la base de datos.
        const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);

        // Si la contraseña no coincide con el hash, se rechazan las credenciales.
        if (!contrasenaValida) {
            return null;
        }

        // Devuelve únicamente los datos del usuario necesarios para continuar con la autenticación.
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
        // Propaga el error para que el controller gestione la respuesta al cliente.
        throw new Error(
            "Error en la base de datos durante la autenticación:",
            { cause: error }
        );
    }
};