import { Router } from "express";
import { login } from "../controllers/authControllers.js";

// Crea el enrutador de autenticación.
const router = Router();

// Define la ruta de inicio de sesión.
router.post("/login", login);

// Exporta las rutas de autenticación.
export default router;
