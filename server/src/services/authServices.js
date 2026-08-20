// Importa la función del model encargada de buscar el usuario en PostgreSQL.
import { obtenerUsuarioPorCorreo } from "../models/usuarioModel.js";

// Importa bcrypt para comparar la contraseña recibida con el hash almacenado.
import bcrypt from "bcryptjs";

export const validarCredenciales = async (correo, contrasena) => {
    try {
        // Busca el usuario mediante el model.
        const usuario = await obtenerUsuarioPorCorreo(correo);

        // Si no existe un usuario con ese correo, las credenciales no son válidas.
        if (!usuario) {
            return null;
        }

        // Compara la contraseña recibida con el hash almacenado en la base de datos.
        const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);

        // Si la contraseña no coincide con el hash, se rechazan las credenciales.
        if (!contrasenaValida) {
            return null;
        }

        // Devuelve únicamente los datos del usuario necesarios para continuar con la autenticación.
        return {
            usuario: {
                id_usuario: usuario.id_usuario,
                nombres: usuario.nombres,
                apellidos: usuario.apellidos,
                correo: usuario.correo,
                numero_telefono: usuario.numero_telefono,
                fecha_nacimiento: usuario.fecha_nacimiento
            }
        };
    } catch (error) {
        // Propaga el error para que el controller gestione la respuesta al cliente.
        throw new Error(
            "Error en la base de datos durante la autenticación",
            { cause: error }
        );
    }
};