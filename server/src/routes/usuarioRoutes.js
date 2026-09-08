import { Router } from "express";

import * as usuarioController from "../controllers/usuarioControllers.js";
import { verificarAutenticacion } from "../middlewares/authMiddleware.js";
import { validarUsuario, validarContrasena } from "../middlewares/validarUsuario.js";
import { verificarPropietario } from "../middlewares/verificarPropietario.js";

const router = Router();

router.get(
    "/:id",
    verificarAutenticacion,
    verificarPropietario,
    usuarioController.obtenerUsuarioPorId
);

router.post(
    "/",
    validarUsuario,
    validarContrasena,
    usuarioController.crearUsuario
);

router.put(
    "/:id",
    verificarAutenticacion,
    verificarPropietario,
    validarUsuario,
    usuarioController.actualizarUsuario
);

router.put(
    "/:id/contrasena",
    verificarAutenticacion,
    verificarPropietario,
    validarContrasena,
    usuarioController.actualizarContrasena
);

router.delete(
    "/:id",
    verificarAutenticacion,
    verificarPropietario,
    usuarioController.eliminarUsuario
);

export default router;
