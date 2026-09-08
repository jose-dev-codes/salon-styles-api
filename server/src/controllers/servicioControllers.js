// Importa la función que obtiene los servicios desde el service.
import { listarServicios } from "../services/servicioServices.js";

export const obtenerServicios = async (req, res) => {
    try {
        const servicios = await listarServicios();

        return res.status(200).json(servicios);
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener los servicios."
        });
    }
};
