import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config/api';

// Obtiene las citas del usuario autenticado mediante una solicitud al backend.
export const obtenerMisCitas = async () => {
  const token = await AsyncStorage.getItem('token');

  if (!token) {
    return null;
  }

  const respuesta = await fetch(
    `${API_URL}/citas`,
    {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    }
  );

  const datos = await respuesta.json();

  return {
    respuesta,
    datos
  };
};

// Obtiene los servicios disponibles mediante una solicitud al backend.
export const obtenerServicios = async () => {
  const token = await AsyncStorage.getItem('token');

  if (!token) {
    return null;
  }

  const respuesta = await fetch(
    `${API_URL}/servicios`,
    {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    }
  );

  const datos = await respuesta.json();

  return {
    respuesta,
    datos
  };
};

// Crea una nueva cita mediante una solicitud al backend.
export const crearCita = async(
  idServicio: string,
  fecha: string,
  hora: string,
  especialista: string
) => {
  const token = await AsyncStorage.getItem('token');

  if (!token) {
    return null;
  }

  const respuesta = await fetch(
    `${API_URL}/citas`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        id_servicio: Number(idServicio),
        fecha,
        hora,
        especialista
      })
    }
  );

  const datos = await respuesta.json();

  return {
    respuesta,
    datos
  };
};

// Actualiza los datos de una cita mediante una solicitud al backend.
export const actualizarCita = async (
  id: string,
  fecha: string,
  hora: string,
  especialista: string
) => {
  const token = await AsyncStorage.getItem('token');

  if (!token) {
    return null;
  }

  const respuesta = await fetch(
    `${API_URL}/citas/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        fecha,
        hora,
        especialista
      })
    }
  );

  const datos = await respuesta.json();

  return {
    respuesta,
    datos
  };
};

// Cancela una cita mediante una solicitud al backend.
export const cancelarCita = async (id: string) => {
  const token = await AsyncStorage.getItem('token');

  if (!token) {
    return null;
  }

  const respuesta = await fetch(
    `${API_URL}/citas/${id}/cancelar`,
    {
      method: 'PATCH',
      headers: {
        'Authorization': token
      }
    }
  );

  const datos = await respuesta.json();

  return {
    respuesta,
    datos
  };
};
