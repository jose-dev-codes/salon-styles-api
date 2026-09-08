import { API_URL } from '../../config/api';

// Registra un nuevo usuario mediante una solicitud al backend.
export const registrarUsuario = async (
  nombres: string,
  apellidos: string,
  correo: string,
  contrasena: string,
  numeroTelefono: string,
  fechaNacimiento: string
) => {
  const respuesta = await fetch(
    `${API_URL}/usuarios`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombres,
        apellidos,
        correo,
        contrasena,
        numero_telefono: numeroTelefono,
        fecha_nacimiento: fechaNacimiento
      })
    }
  );

  const datos = await respuesta.json();

  return {
    respuesta,
    datos
  };
};
