import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../../config/api';
import { verificarSesion } from './sesionService';

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


export const obtenerPerfil = async () => {
  const token = await AsyncStorage.getItem('token');

  if (!token) {
    return null;
  }

  const respuesta = await fetch(
    `${API_URL}/usuarios/perfil`,
    {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    }
  );

  const sesionValida = await verificarSesion(respuesta);

  if (!sesionValida) {
    return null;
  }

  const datos = await respuesta.json();

  return {
    respuesta,
    datos: datos.usuario
  };
};
