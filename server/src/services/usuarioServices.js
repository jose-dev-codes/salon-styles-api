// Importa todas las operaciones de acceso a datos del model de usuarios.
import * as usuarioModel from "../models/usuarioModel.js";

import bcrypt from "bcryptjs";

// Valida y crea un nuevo usuario.
export const crearUsuario = async (datos) => {
    const usuarioExistente = await usuarioModel.obtenerUsuarioPorCorreo(
        datos.correo
    );

    if (usuarioExistente) {
        return {
            exito: false,
            error: "El correo ya está registrado."
        };
    }

    const fechaActual = new Date().toISOString().split("T")[0];

    if (datos.fecha_nacimiento > fechaActual) {
        return {
            exito: false,
            error: "La fecha de nacimiento no puede ser futura."
        };
    }

    const contrasenaHasheada = await bcrypt.hash(datos.contrasena, 10);

    const datosConHash = {
        ...datos,
        contrasena: contrasenaHasheada
    };

    const usuario = await usuarioModel.crearUsuario(datosConHash);

    return {
        exito: true,
        usuario
    };
};

// Valida y actualiza los datos de un usuario.
export const actualizarUsuario = async (id, datos) => {
    const usuario = await usuarioModel.buscarUsuarioPorId(id);

    if (!usuario) {
        return {
            exito: false,
            noEncontrado: true
        };
    }

    const usuarioExistente = await usuarioModel.obtenerUsuarioPorCorreo(
        datos.correo
    );

    if (usuarioExistente && usuarioExistente.id_usuario !== id) {
        return {
            exito: false,
            error: "Este correo ya está registrado"
        };
    }

    const usuarioActualizado = await usuarioModel.actualizarUsuario(id, datos);

    return {
        exito: true,
        usuarioActualizado
    };
};

export const obtenerUsuarioPorId = async (id) => {
    const usuario = await usuarioModel.buscarUsuarioPorId(id);

    if (!usuario) {
        return {
            exito: false,
            noEncontrado: true
        };
    }

    return {
        exito: true,
        usuario
    };
};

export const eliminarUsuario = async (id) => {
    const resultado = await usuarioModel.eliminarUsuario(id);

    if (resultado === 0) {
        return {
            exito: false,
            noEncontrado: true
        };
    }

    return {
        exito: true
    };
};

export const actualizarContrasena = async (id, contrasena) => {
    const contrasenaHasheada = await bcrypt.hash(contrasena, 10);

    const resultado = await usuarioModel.actualizarContrasena(id, contrasenaHasheada);

    if (resultado === 0) {
        return {
            exito: false,
            noEncontrado: true
        };
    }

    return {
        exito: true
    };
};