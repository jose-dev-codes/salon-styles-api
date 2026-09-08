import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Boton from '@/components/Boton';

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
            <View style={styles.botones}>
              <Boton
                texto='Iniciar sesión'
                onPress={() => router.push('/login')}
              />

              <Boton
                texto='Registrarse'
                onPress={() => router.push('/registro')}
              />

            </View>
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
    backgroundColor: '#FCE3EE'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#E42BB8'
  },
  subtitle: {
    marginTop: 15,
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center'
  },
  botones: {
    gap: 15
  }
});

export default IndexScreen;
