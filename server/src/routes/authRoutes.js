import { Router } from "express";
import { login, logout } from "../controllers/authControllers.js";
import { verificarAutenticacion } from "../middlewares/authMiddleware.js";

// Crea el enrutador de autenticación.
const router = Router();

// Define la ruta de inicio de sesión.
router.post("/login", login);

// Define la ruta protegida para cerrar sesión.
router.post("/logout", verificarAutenticacion, logout);

// Exporta las rutas de autenticación.
export default router;
