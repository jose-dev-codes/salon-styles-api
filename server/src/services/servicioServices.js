// Importa la función que obtiene los servicios desde el modelo.
import { obtenerTodosLosServicios } from "../models/servicioModel.js";

// Obtiene todos los servicios disponibles.
export const listarServicios = () => {
    return obtenerTodosLosServicios();
};