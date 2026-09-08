import { API_URL } from '../../config/api';

// Inicia sesión mediante una solicitud al backend.
export const iniciarSesion = async (
  correo: string,
  contrasena: string
) => {
  const respuesta = await fetch(
    `${API_URL}/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        correo,
        contrasena
      })
    }
  );

  const datos = await respuesta.json();

  return {
    respuesta,
    datos
  };
};
