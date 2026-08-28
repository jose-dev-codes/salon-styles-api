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

    return result.rows[0] || null;
};

// Crea un nuevo usuario en la base de datos y devuelve sus datos sin incluir la contraseña.
export const crearUsuario = async (datos) => {
    const {
        nombres,
        apellidos,
        correo,
        contrasena,
        numero_telefono,
        fecha_nacimiento
    } = datos;

    const result = await pool.query(
        `
        INSERT INTO usuarios (
            nombres,
            apellidos,
            correo,
            contrasena,
            numero_telefono,
            fecha_nacimiento
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id_usuario, nombres, apellidos, correo, numero_telefono, fecha_nacimiento;
        `,
        [nombres, apellidos, correo, contrasena, numero_telefono, fecha_nacimiento]
    );
    return result.rows[0];
};

// Actualiza los datos de un usuario según su identificador.
export const actualizarUsuario = async (id, datos) => {
    const {
        nombres,
        apellidos,
        correo,
        numero_telefono,
        fecha_nacimiento
    } = datos;

    const result = await pool.query(
        `
        UPDATE usuarios
        SET nombres = $1,
            apellidos = $2,
            correo = $3,
            numero_telefono = $4,
            fecha_nacimiento = $5
        WHERE id_usuario = $6
        RETURNING
            id_usuario,
            nombres,
            apellidos,
            correo,
            numero_telefono,
            fecha_nacimiento;
        `,
        [nombres, apellidos, correo, numero_telefono, fecha_nacimiento, id]
    );

    return result.rows[0] || null;
};

// Busca un usuario mediante su identificador.
export const buscarUsuarioPorId = async (id) => {
    const result = await pool.query(
        `
        SELECT
            id_usuario,
            nombres,
            apellidos,
            correo,
            numero_telefono,
            fecha_nacimiento
        FROM usuarios
        WHERE id_usuario = $1;
        `,
        [id]
    );

    return result.rows[0] || null;
};

export const eliminarUsuario = async (id) => {
    const result = await pool.query(
        `
        DELETE FROM usuarios
        WHERE id_usuario = $1;
        `,
        [id]
    );

    return result.rowCount;
};

export const actualizarContrasena = async (id, contrasena) => {
    const result = await pool.query(
        `
        UPDATE usuarios
        SET contrasena = $1
        WHERE id_usuario = $2;
        `,
        [contrasena, id]
    );

    return result.rowCount;
};
