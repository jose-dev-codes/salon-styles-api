// Importa Express y los routers de los módulos de citas y autenticación.
import express from "express";
import citaRoute from "./routes/citaRoutes.js";
import authRoute from "./routes/authRoutes.js";
import usuarioRoute from "./routes/usuarioRoutes.js";

const app = express();

// Permite procesar solicitudes con cuerpo en formato JSON.
app.use(express.json());

// Ruta de prueba para comprobar que el servidor está en funcionamiento.
app.get("/", (req, res) => {
    res.send("Servidor funcionando");
});

// Registra las rutas de citas y autenticación con sus respectivos prefijos.
app.use("/api/citas", citaRoute);
app.use("/api/auth", authRoute);
app.use("/api/usuarios", usuarioRoute);

export default app;
