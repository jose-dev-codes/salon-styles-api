import {
    crearRequisitosNombre,
    crearRequisitosFecha,
    obtenerError
} from "../utils/validacionUtils.js";

export const validarUsuario = (req, res, next) => {
    const { nombres, apellidos, correo, numero_telefono, fecha_nacimiento } = req.body;

    if (typeof nombres !== "string" || typeof apellidos !== "string") {
        return res.status(400).json({
            error: "Los nombres y apellidos deben ser texto."
        });
    }

    const requisitosNombres = [
        ...crearRequisitosNombre(nombres, "Los nombres"),
        ...crearRequisitosNombre(apellidos, "Los apellidos")
    ];

    const errorNombres = obtenerError(requisitosNombres);

    if (errorNombres) {
        return res.status(400).json({
            error: errorNombres
        });
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (typeof correo !== "string") {
        return res.status(400).json({
            error: "El correo debe ser un texto."
        });
    }

    const requisitosCorreo = [
        {
            condicion: correo.trim().length > 0,
            mensaje: "El correo es obligatorio."
        },
        {
            condicion: correo.length <= 100,
            mensaje: "El correo no puede superar los 100 caracteres."
        },
        {
            condicion: regexCorreo.test(correo),
            mensaje: "El correo no tiene un formato válido."
        }
    ];

    const errorCorreo = obtenerError(requisitosCorreo);

    if (errorCorreo) {
        return res.status(400).json({
            error: errorCorreo
        });
    }

    if (typeof numero_telefono !== "string") {
        return res.status(400).json({
            error: "El número de teléfono debe ser un texto."
        });
    }

    const requisitosTelefono = [
        {
            condicion: numero_telefono.trim().length > 0,
            mensaje: "El teléfono es obligatorio."
        },
        {
            condicion: numero_telefono.length >= 10,
            mensaje: "El teléfono debe tener al menos 10 caracteres."
        },
        {
            condicion: numero_telefono.length <= 15,
            mensaje: "El teléfono no puede superar los 15 caracteres."
        },
        {
            condicion: /^[0-9]+$/.test(numero_telefono),
            mensaje: "El teléfono solo puede contener números."
        }
    ];

    const errorTelefono = obtenerError(requisitosTelefono);

    if (errorTelefono) {
        return res.status(400).json({
            error: errorTelefono
        });
    }

    if (typeof fecha_nacimiento !== "string") {
        return res.status(400).json({
            error: "La fecha de nacimiento debe ser un texto."
        });
    }

    const requisitosFecha = crearRequisitosFecha(
        fecha_nacimiento, "La fecha de nacimiento"
    );

    const errorFecha = obtenerError(requisitosFecha);

    if (errorFecha) {
        return res.status(400).json({
            error: errorFecha
        });
    }

    next();
};

export const validarContrasena = (req, res, next) => {
    const { contrasena } = req.body;

    if (typeof contrasena !== "string") {
        return res.status(400).json({
            error: "La contraseña debe ser un texto."
        });
    }

    const requisitosContrasena = [
        {
            condicion: contrasena.trim().length > 0,
            mensaje: "La contraseña es obligatoria."
        },
        {
            condicion: contrasena.length >= 6,
            mensaje: "La contraseña debe tener al menos 6 caracteres."
        },
        {
            condicion: /[A-Z]/.test(contrasena),
            mensaje: "La contraseña debe tener al menos una mayúscula."
        },
        {
            condicion: /[a-z]/.test(contrasena),
            mensaje: "La contraseña debe tener al menos una minúscula."
        },
        {
            condicion: /\d/.test(contrasena),
            mensaje: "La contraseña debe tener al menos un número."
        },
        {
            condicion: /[^A-Za-z0-9\s]/.test(contrasena),
            mensaje: "La contraseña debe tener al menos un caracter especial."
        },
        {
            condicion: !/\s/.test(contrasena),
            mensaje: "La contraseña no debe tener espacios."
        }
    ];

    const errorContrasena = obtenerError(requisitosContrasena);

    if (errorContrasena) {
        return res.status(400).json({
            error: errorContrasena

        });
    }

    next();
};
