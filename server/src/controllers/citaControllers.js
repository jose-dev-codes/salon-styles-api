// Importa las funciones del servicio de citas.
import * as citaService from "../services/citaServices.js";

// Obtiene todas las citas registradas y las devuelve en formato JSON
export const listar = async (req, res) => {
    try {
        const citas = await citaService.obtenerTodasLasCitas();
        res.json(citas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las citas" });
    }

};

// Crea una nueva cita con los datos recibidos en la petición.
export const crear = async (req, res) => {
    try {
        const cita = await citaService.crearCita(req.body);

        res.status(201).json({ mensaje: "Cita creada correctamente", cita });
    } catch (error) {
        res.status(500).json({ error: "Error al crear la cita" });
    }
};

// Actualiza una cita existente según el identificador recibido en la URL.
export const actualizar = async (req, res) => {
    try {
        const cita = await citaService.editarCita(req.params.id, req.body);
        if (!cita) return res.status(404).json({ error: "Cita no encontrada" });
        res.json({ mensaje: "Cita actualizada correctamente", cita });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la cita" });
    }
};

// Elimina una cita según el identificador recibido en la URL.
export const eliminar = async (req, res) => {
    try {
        const cita = await citaService.eliminarCita(req.params.id);
        if (!cita) return res.status(404).json({ error: "Cita no encontrada" });
        res.json({ mensaje: "Cita eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la cita" });
    }
};