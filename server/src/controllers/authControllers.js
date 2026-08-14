import * as authService from "../services/authServices.js";

export const login = async (req, res) => {
    const { correo, contrasena } = req.body;

    try {
        if (!correo || !contrasena) {
            return res.status(400).json({ error: "El correo y la contraseña son obligatorios" });
        }

        const usuario = await authService.validarCredenciales(
            correo, contrasena
        );

        if (!usuario) return res.status(401).json({ error: "Credenciales incorrectas" });

        res.status(200).json(usuario);

    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};