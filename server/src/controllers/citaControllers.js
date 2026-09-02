// Importa las funciones del servicio de citas.
import * as citaService from "../services/citaServices.js";

// Obtiene todas las citas registradas y las devuelve en formato JSON
export const listar = async (req, res) => {
    try {
        const citas = await citaService.obtenerTodasLasCitas(
            req.usuario.id
        );

        res.json(citas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las citas" });
    }

};

// Valida los datos recibidos y solicita la creación de una nueva cita.
export const crear = async (req, res) => {
    try {
        const { id_servicio, fecha, hora, especialista } = req.body;
        const id_usuario = req.usuario.id;

        if (!id_servicio || !fecha || !hora || !especialista) {
            return res.status(400).json({
                error: "Todos los datos de la cita son obligatorios"
            });
        }

        const datosCita = {
            id_servicio,
            fecha,
            hora,
            especialista,
            id_usuario
        };

        const resultado = await citaService.crearCita(datosCita);

        if (!resultado.exito) {
            return res.status(400).json({
                error: resultado.error
            });
        }

        res.status(201).json({
            mensaje: "Cita creada correctamente",
            cita: resultado.cita
        });

    } catch (error) {
        res.status(500).json({ error: "Error al crear la cita" });
    }
};

// Valida los datos recibidos y solicita la actualización de una cita.
export const actualizar = async (req, res) => {
    try {
        const { fecha, hora, especialista } = req.body;

        if (!fecha || !hora || !especialista) {
            return res.status(400).json({
                error: "La fecha, hora y especialista son obligatorios."
            });
        }

        const resultado = await citaService.editarCita(req.params.id, req.body);

        if (resultado.noEncontrada) {
            return res.status(404).json({
                error: "Cita no encontrada"
            });
        }

        if (!resultado.exito) {
            return res.status(400).json({ error: resultado.error });
        }

        res.json({
            mensaje: "Cita actualizada correctamente",
            cita: resultado.citaActualizada
        });

    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la cita" });
    }
};

// Solicita la cancelación de una cita según el identificador recibido en la URL.
export const cancelar = async (req, res) => {
    try {
        const resultado = await citaService.cancelarCita(req.params.id);

        if (resultado.noEncontrada) {
            return res.status(404).json({
                error: "Cita no encontrada"
            });
        }

        res.json({
            mensaje: "Cita cancelada correctamente",
            cita: resultado.citaCancelada
        });

    } catch (error) {
        res.status(500).json({
            error: "Error al cancelar la cita"
        });
    }
};

// Solicita la eliminación de una cita según el identificador recibido en la URL.
export const eliminar = async (req, res) => {
    try {
        const resultado = await citaService.eliminarCita(req.params.id);

        if (resultado.noEncontrada) {
            return res.status(404).json({
                error: "Cita no encontrada"
            });
        }

        res.json({ mensaje: "Cita eliminada correctamente" });

    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la cita" });
    }
};