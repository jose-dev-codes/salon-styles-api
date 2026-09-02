import AsyncStorage from '@react-native-async-storage/async-storage';

export const obtenerMisCitas = async () => {
  const token = await AsyncStorage.getItem('token');

  if (!token) {
    return null;
  }

  const respuesta = await fetch(
    'http://192.168.1.95:3000/api/citas',
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
    'http://192.168.1.95:3000/api/citas',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        id_servicio: idServicio,
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
    `http://192.168.1.95:3000/api/citas/${id}`,
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
    `http://192.168.1.95:3000/api/citas/${id}/cancelar`,
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
