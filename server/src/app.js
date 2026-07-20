// Importa Express y las rutas del módulo de citas.
import express from "express";
import citaRoute from "./routes/citaRoutes.js";

const app = express();

// Permite procesar solicitudes con cuerpo en formato JSON.
app.use(express.json());

// Ruta de prueba para comprobar que el servidor está en funcionamiento.
app.get("/", (req, res) => {
    res.send("Servidor funcionando");
});

// Registra las rutas del módulo de citas bajo el prefijo /api/citas.
app.use("/api/citas", citaRoute);

export default app;