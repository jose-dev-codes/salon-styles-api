// Importa Express para crear las rutas de la API.
import express from "express";

// Importa las funciones del controlador de citas.
import * as citaController from "../controllers/citaControllers.js";

// Importa el middleware encargado de verificar el token JWT.
import { verificarAutenticacion } from "../middlewares/authMiddleware.js";

// Crea una instancia del enrutador de Express.
const router = express.Router();

// Define las rutas del CRUD de citas y protege cada operación mediante autenticación.
router.get("/", verificarAutenticacion, citaController.listar);
router.post("/", verificarAutenticacion, citaController.crear);
router.put("/:id", verificarAutenticacion, citaController.actualizar);
router.delete("/:id", verificarAutenticacion, citaController.eliminar);

export default router;