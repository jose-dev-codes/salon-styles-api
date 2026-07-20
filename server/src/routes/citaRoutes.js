// Importa Express para crear las rutas de la API
import express from "express";

// Importa las funciones del controlador de citas.
import * as citaController from "../controllers/citaControllers.js";

// Crea una instancia del enrutador de Express.
const router = express.Router();

// Define las rutas del CRUD de citas.
router.get("/", citaController.listar);
router.post("/", citaController.crear);
router.put("/:id", citaController.actualizar);
router.delete("/:id", citaController.eliminar);

export default router;