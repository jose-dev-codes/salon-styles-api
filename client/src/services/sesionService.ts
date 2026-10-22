import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import API_URL from '../../config/api';

// Limpia la sesión solo en el dispositivo y vuelve a la pantalla inicial.
// No habla con el backend. Se usa cuando el token ya fue rechazado.
const limpiarSesionLocal = async () => {
  await AsyncStorage.removeItem('token');
  router.dismissAll();
  router.replace('/');
};

// Cierre de sesión pedido por el usuario (botón de perfil).
// Primero intenta revocar el token en el backend y luego limpia lo local.
// Devuelve true si el servidor confirmó la revocación, false si no.
export const cerrarSesion = async () => {
  let revocado = false;

  try {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      const respuesta = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': token
        }
      });

      revocado = respuesta.ok
    }
  } catch (error) {
    console.error('No se pudo revocar el token en el servidor.', error);
  }

  // Se limpia siempre, para que el usuario no quede atrapado en la sesión
  await limpiarSesionLocal();

  return revocado;
};

// Revisa si el servidor rechazó el token (inválido, expirado o revocado).
// Solo limpia lo local: no intenta revocar un token que ya fue rechazado.
export const verificarSesion = async (respuesta: Response) => {
  if (respuesta.status === 403) {
    await limpiarSesionLocal();
    return false;
  }

  return true;
};
