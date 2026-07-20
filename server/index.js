// Carga las variables de entorno e importa la aplicación.
import "dotenv/config";
import app from "./src/app.js";

// Inicia el servidor en el puerto definido en el archivo .env.
app.listen(process.env.PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${process.env.PORT}`);
});