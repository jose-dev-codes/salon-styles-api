import {
    crearRequisitosFecha,
    crearRequisitosNombre,
    obtenerError
} from "../utils/validacionUtils.js";

const esHoraValida = (hora) => {
    const [horas, minutos] = hora.split(":").map(Number);

    return (
        horas >= 0 &&
        horas <= 23 &&
        minutos >= 0 &&
        minutos <= 59
    );
};

export const validarCita = (req, res, next) => {
    const { id_servicio, fecha, hora, especialista } = req.body;

    if (req.method === "POST") {
        if (!Number.isInteger(id_servicio)) {
            return res.status(400).json({
                error: "El identificador del servicio debe ser un número entero."
            });
        }

        const requisitosIdServicio = [
            {
                condicion: id_servicio > 0,
                mensaje: "El identificador del servicio debe ser positivo."
            }
        ];

        const errorIdServicio = obtenerError(requisitosIdServicio);

        if (errorIdServicio) {
            return res.status(400).json({
                error: errorIdServicio
            });
        }

    }

    if (typeof fecha !== "string") {
        return res.status(400).json({
            error: "La fecha debe ser un texto."
        });
    }

    const requisitosFecha = crearRequisitosFecha(fecha, "La fecha");

    const errorFecha = obtenerError(requisitosFecha);

    if (errorFecha) {
        return res.status(400).json({
            error: errorFecha
        });
    }

    if (typeof hora !== "string") {
        return res.status(400).json({
            error: "La hora debe ser un texto."
        });
    }

    const requisitosHora = [
        {
            condicion: hora.trim().length > 0,
            mensaje: "La hora es obligatoria."
        },
        {
            condicion: /^\d{2}:\d{2}$/.test(hora),
            mensaje: "La hora debe tener el formato HH:MM."
        },
        {
            condicion: esHoraValida(hora),
            mensaje: "La hora no es válida."
        }
    ];

    const errorHora = obtenerError(requisitosHora);

    if (errorHora) {
        return res.status(400).json({
            error: errorHora
        });
    }

    if (typeof especialista !== "string") {
        return res.status(400).json({
            error: "El especialista debe ser un texto."
        });
    }

    const requisitosEspecialista = crearRequisitosNombre(
        especialista,
        "Los nombres del especialista"
    );

    const errorEspecialista = obtenerError(requisitosEspecialista);

    if (errorEspecialista) {
        return res.status(400).json({
            error: errorEspecialista
        });
    }

    next();
};
