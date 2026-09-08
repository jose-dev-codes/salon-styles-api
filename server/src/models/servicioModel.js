// Importa el pool de conexiones a PostgreSQL.
import pool from '../config/db.js';

// Obtiene todos los servicios activos registrados en la base de datos.
export const obtenerTodosLosServicios = async () => {
    const result = await pool.query(
        `
        SELECT *
        FROM servicios
        WHERE estado = 'activo';
        `
    );

    return result.rows;
};
