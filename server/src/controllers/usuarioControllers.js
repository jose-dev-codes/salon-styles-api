import * as usuarioService from "../services/usuarioServices.js";

export const crearUsuario = async (req, res) => {
    try {
        const resultado = await usuarioService.crearUsuario(req.body);

        if (!resultado.exito) {
            return res.status(400).json({
                error: resultado.error
            });
        }

        return res.status(201).json(resultado);

    } catch (error) {
        res.status(500).json({
            error: "Error al crear el usuario."
        });
    }
};

export const actualizarUsuario = async (req, res) => {
    try {
        const resultado = await usuarioService.actualizarUsuario(
            Number(req.params.id), req.body
        );

        if (resultado.noEncontrado) {
            return res.status(404).json({
                error: "Usuario no encontrado."
            });
        }

        if (!resultado.exito) {
            return res.status(400).json({
                error: resultado.error
            });
        }

        return res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({
            error: "Error al actualizar el usuario."
        });
    }
};

export const obtenerUsuarioPorId = async (req, res) => {
    try {
        const resultado = await usuarioService.obtenerUsuarioPorId(
            Number(req.params.id)
        );

        if (resultado.noEncontrado) {
            return res.status(404).json({
                error: "Usuario no encontrado"
            });
        }

        return res.status(200).json({
            exito: true,
            usuario: resultado.usuario
        });

    } catch (error) {
        res.status(500).json({
            error: "Error al obtener el usuario."
        });
    }
};

export const eliminarUsuario = async (req, res) => {
    try {
        const resultado = await usuarioService.eliminarUsuario(
            Number(req.params.id));

        if (resultado.noEncontrado) {
            return res.status(404).json({
                error: "Usuario no encontrado"
            });
        }

        return res.status(200).json({
            exito: resultado.exito,
            mensaje: "Usuario eliminado exitosamente"
        });

    } catch (error) {
        res.status(500).json({
            error: "Error al eliminar el usuario."
        });
    }
};

export const actualizarContrasena = async (req, res) => {
    try {
        const resultado = await usuarioService.actualizarContrasena(
            Number(req.params.id), req.body.contrasena
        );

        if (resultado.noEncontrado) {
            return res.status(404).json({
                error: "Usuario no encontrado"
            });
        }

        return res.status(200).json({
            exito: resultado.exito,
            mensaje: "Cambio de contraseña exitoso"
        });

    } catch (error) {
        res.status(500).json({
            error: "Error al actualizar la contraseña."
        });
    }
};