import { Router } from "express";
import { login } from "../controllers/authControllers.js";

// Crea una instancia del enrutador para definir las rutas de autenticación.
const router = Router();

// Define la ruta de inicio de sesión y la conecta con el controlador correspondiente.
router.post("/login", login);

// Exporta las rutas para utilizarlas en la aplicación principal.
export default router;
