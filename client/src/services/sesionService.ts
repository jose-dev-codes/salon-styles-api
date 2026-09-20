import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export const cerrarSesion = async () => {
  await AsyncStorage.removeItem('token');
};

export const verificarSesion = async (respuesta: Response) => {
  if (respuesta.status === 403) {
    await cerrarSesion();
    router.dismissAll();
    router.replace('/');
    return false;
  }

  return true;
};
