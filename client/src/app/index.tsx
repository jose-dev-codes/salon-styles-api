import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Boton from '@/components/Boton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PantallaInicio = () => {
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
    <SafeAreaView style={styles.contenedor}>
      {!verificandoSesion && (
        <>
          <View style={styles.circuloIcono}>
            <MaterialCommunityIcons
              name='content-cut'
              size={50}
              color='#FFFFFF'
            />
          </View>

          <Text style={styles.titulo}>Cejas y Uñas</Text>
          <Text style={styles.subtitulo}>Tu belleza, nuestra pasión</Text>

          {!sesionActiva && (
            <View style={styles.botones}>
              <Boton
                texto='Iniciar sesión'
                onPress={() => router.push('/login')}
              />

              <Boton
                texto='Registrarse'
                onPress={() => router.push('/registro')}
                variante='secundario'
              />

            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FCE3EE'
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#E42BB8'
  },
  subtitulo: {
    marginTop: 5,
    marginBottom: 30,
    fontSize: 16,
    color: '#8F1568',
    textAlign: 'center',
    fontWeight: '600'
  },
  botones: {
    gap: 15
  },
  circuloIcono: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E42BB8',
    height: 100,
    width: 100,
    borderRadius: 100,
    marginBottom: 10
  }
});

export default PantallaInicio;
