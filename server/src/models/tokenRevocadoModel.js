import pool from "../config/db.js";

// Registra un token revocado y su fecha de expiración.
export const registrarTokenRevocado = async (tokenId, fechaExpiracion) => {
    await pool.query(
        `
        INSERT INTO tokens_revocados (token_id, fecha_expiracion)
        VALUES ($1, $2)
        `,
        [tokenId, fechaExpiracion]
    );
};

// Comprueba si un token ya fue revocado.
export const tokenEstaRevocado = async (tokenId) => {
    const result = await pool.query(
        `
        SELECT 1
        FROM tokens_revocados
        WHERE token_id = $1
        `,
        [tokenId]
    );

    return result.rowCount > 0;
};
