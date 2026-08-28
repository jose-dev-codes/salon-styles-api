// Importa todas las operaciones de acceso a datos del model de citas.
import * as citaModel from "../models/citaModel.js";

// Obtiene todas las citas registradas en la base de datos.
export const obtenerTodasLasCitas = async (idUsuario) => {
    return await citaModel.obtenerTodasLasCitas(idUsuario);
};

// Valida y crea una nueva cita.
export const crearCita = async (datos) => {
    const { fecha, hora, especialista } = datos;

    const fechaActual = new Date().toISOString().split("T")[0];

    if (fecha < fechaActual) {
        return {
            exito: false,
            error: "No se puede crear una cita con una fecha pasada."
        };
    }

    const citaExistente = await citaModel.buscarCitaExistente(
        fecha, hora, especialista
    );

    if (citaExistente) {
        return {
            exito: false,
            error: "El especialista ya tiene una cita en esa fecha y hora."
        };
    }

    const cita = await citaModel.crearCita(datos);

    return {
        exito: true,
        cita
    };
};

// Valida y actualiza la fecha, la hora y el especialista de una cita.
export const editarCita = async (id, datos) => {
    const { fecha, hora, especialista } = datos;

    const cita = await citaModel.buscarCitaPorId(id);

    if (!cita) {
        return {
            exito: false,
            noEncontrada: true
        };
    }

    const fechaActual = new Date().toISOString().split("T")[0];

    if (fecha < fechaActual) {
        return {
            exito: false,
            error: "No se puede actualizar una cita a una fecha pasada."
        };
    }

    const citaExistente = await citaModel.buscarCitaExistente(
        fecha, hora, especialista, id
    );

    if (citaExistente) {
        return {
            exito: false,
            error: "El especialista ya tiene una cita en esa fecha y hora."
        };
    }

    const citaActualizada = await citaModel.editarCita(id, datos);

    return {
        exito: true,
        citaActualizada
    };
};

// Elimina una cita según su identificador.
export const eliminarCita = async (id) => {
    const cita = await citaModel.eliminarCita(id);

    if (!cita) {
        return {
            exito: false,
            noEncontrada: true
        };
    }

    return {
        exito: true,
        cita
    };
};
