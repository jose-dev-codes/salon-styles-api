// Importa Express para crear el enrutador de la API.
import express from "express";

// Importa las funciones del controlador de citas.
import * as citaController from "../controllers/citaControllers.js";

// Importa el middleware encargado de verificar el token JWT.
import { verificarAutenticacion } from "../middlewares/authMiddleware.js";

import { verificarPropietarioCita } from "../middlewares/verificarPropietarioCita.js";

import { validarCita } from "../middlewares/validarCita.js";

// Crea una instancia del enrutador de Express.
const router = express.Router();

// Define las rutas de citas y protege cada operación según corresponda.
router.get("/", verificarAutenticacion, citaController.listar);
router.post(
    "/",
    verificarAutenticacion,
    validarCita,
    citaController.crear
);

router.put(
    "/:id",
    verificarAutenticacion,
    verificarPropietarioCita,
    validarCita,
    citaController.actualizar
);

router.patch(
    "/:id/cancelar",
    verificarAutenticacion,
    verificarPropietarioCita,
    citaController.cancelar
);

router.delete(
    "/:id",
    verificarAutenticacion,
    verificarPropietarioCita,
    citaController.eliminar
);

export default router;
