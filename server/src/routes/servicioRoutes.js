import express from "express";
import { obtenerServicios } from "../controllers/servicioControllers.js";
import { verificarAutenticacion } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/", verificarAutenticacion, obtenerServicios);

export default router;
