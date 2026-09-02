import { Button, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IndexScreen = () => {
  const [sesionActiva, setSesionActiva] = useState(false);
  const [verificandoSesion, setVerificandoSesion] = useState(true);

  // Verifica si existe una sesión activa antes de mostrar la pantalla.
  useEffect(() => {
    const verificarSesion = async () => {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        setSesionActiva(true);
        router.replace('/home');
      }

      setVerificandoSesion(false);
    };

    verificarSesion();
  }, []);

  return (
    <View style={styles.container}>
      {!verificandoSesion && (
        <>
          <Text style={styles.title}>Bienvenido a Cejas y uñas</Text>
          <Text style={styles.subtitle}>Reserva tu cita de belleza</Text>

          {!sesionActiva && (
            <Button
              title='Iniciar sesión'
              onPress={() => router.push('/login')}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitle: {
    marginTop: 15,
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center'
  }
});

export default IndexScreen;
