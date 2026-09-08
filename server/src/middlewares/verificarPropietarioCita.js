import { buscarCitaPorId } from "../models/citaModel.js";

export const verificarPropietarioCita = async (req, res, next) => {
    try {
        const cita = await buscarCitaPorId(req.params.id);

        if (!cita) {
            return res.status(404).json({
                error: "Cita no encontrada."
            });
        }
        const esPropietarioCita = req.usuario.id === cita.id_usuario;

        if (!esPropietarioCita) {
            return res.status(403).json({
                error: "Usuario no autorizado."
            });
        }

        next();

    } catch (error) {
        res.status(500).json({
            error: "Error al verificar la propiedad de la cita."
        });
    }
};
