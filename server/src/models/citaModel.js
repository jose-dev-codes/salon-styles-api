// Importa el pool de conexiones a PostgreSQL.
import pool from "../config/db.js";

// Obtiene todas las citas registradas en la base de datos.
export const obtenerTodasLasCitas = async () => {
    const result = await pool.query("SELECT * FROM citas");
    return result.rows;
};

// Crea una nueva cita con estado "pendiente" por defecto.
export const crearCita = async (datos) => {
    const { id_servicio, id_usuario, fecha, hora, especialista } = datos;

    const result = await pool.query(
        `
        INSERT INTO citas (
            id_servicio,
            id_usuario,
            fecha,
            hora,
            especialista,
            estado
        )
        VALUES ($1, $2, $3, $4, $5, 'pendiente')
        RETURNING *;
        `,
        [id_servicio, id_usuario, fecha, hora, especialista]
    );
    return result.rows[0];
};

// Actualiza la fecha, la hora y el especialista de una cita según su identificador.
export const editarCita = async (id, datos) => {
    const { fecha, hora, especialista } = datos;

    const result = await pool.query(
        `
        UPDATE citas
        SET
            fecha = $1,
            hora = $2,
            especialista = $3
        WHERE id_cita = $4
        RETURNING *;
        `,
        [fecha, hora, especialista, id]
    );
    return result.rows[0] || null;
};

// Elimina una cita según su identificador y devuelve el registro eliminado.
export const eliminarCita = async (id) => {
    const result = await pool.query(
        `
        DELETE FROM citas
        WHERE id_cita = $1
        RETURNING *;
        `,
        [id]
    );
    return result.rows[0] || null;
};

// Busca si existe una cita para el mismo especialista, fecha y hora.
// Si se proporciona un ID, excluye esa misma cita de la búsqueda.
export const buscarCitaExistente = async (
    fecha,
    hora,
    especialista,
    id = null) => {
    const result = await pool.query(
        `
        SELECT *
        FROM citas
        WHERE fecha = $1
            AND hora = $2
            AND especialista = $3
            AND ($4::integer IS NULL OR id_cita != $4)
        `,
        [fecha, hora, especialista, id]
    );

    return result.rows[0] || null;
};

// Obtiene una cita según su identificador.
export const buscarCitaPorId = async (id) => {
    const result = await pool.query(
        `
        SELECT *
        FROM citas
        WHERE id_cita = $1;
        `,
        [id]
    );

    return result.rows[0] || null;
};