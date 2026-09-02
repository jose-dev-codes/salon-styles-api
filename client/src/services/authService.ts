export const iniciarSesion = async (
  correo: string,
  contrasena: string
) => {
  const respuesta = await fetch(
    'http://192.168.1.95:3000/api/auth/login',
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
