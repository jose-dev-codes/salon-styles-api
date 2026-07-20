// Importa el cliente de PostgreSQL.
import { Pool } from "pg";

// Crea un pool de conexiones utilizando las variables de entorno.
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

try {
    // Verifica la conexión con la base de datos al iniciar la aplicación.
    const client = await pool.connect();
    console.log("Base de datos conectada correctamente.");
    client.release();
} catch (error) {
    console.error("Error al conectar a PostgreSQL:", error.message);
}

export default pool;