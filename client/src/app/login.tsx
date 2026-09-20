import {
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Text,
  View
} from 'react-native';

import { router } from 'expo-router';
import { useState } from 'react';
import { validarLogin } from '@/validators/authValidator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { iniciarSesion } from '@/services/authService';
import {
  actualizarCampo,
  limpiarError,
  limpiarCampos
} from '@/utils/formularioUtils';

import Boton from '@/components/Boton';
import CampoFormulario from '@/components/campoFormulario';
import MensajeError from '@/components/MensajeError';
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const manejarInicioSesion = async () => {
    const datosLimpios = limpiarCampos({
      correo,
      contrasena
    });

    const mensajeError = validarLogin(
      datosLimpios.correo,
      datosLimpios.contrasena
    );

    if (mensajeError) {
      setError(mensajeError);
      return;
    }

    limpiarError(setError);

    try {
      const { respuesta, datos } = await iniciarSesion(
        datosLimpios.correo,
        datosLimpios.contrasena
      );

      if (!respuesta.ok) {
        setError(datos.error);
        return;
      }

      await AsyncStorage.setItem('token', datos.token);
      router.replace('/home');

    } catch (error) {
      console.error('Error al conectar con el servidor', error);
      setError('No se pudo conectar con el servidor');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior='padding'
      >
        <Header titulo='Inicio de sesión' />

        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >

          <CampoFormulario
            label='Correo electrónico'
            placeholder='ejemplo@correo.com'
            value={correo}
            keyboardType='email-address'
            autoCapitalize='none'
            onChangeText={(texto) =>
              actualizarCampo(texto, setCorreo, setError)
            }
          />

          <CampoFormulario
            label='Contraseña'
            placeholder='Ingresa tu contraseña'
            value={contrasena}
            secureTextEntry
            onChangeText={(texto) =>
              actualizarCampo(texto, setContrasena, setError)
            }
          />

          {error && <MensajeError mensaje={error} />}

          <View style={styles.buttonContainer}>

            <Boton
              texto='Iniciar sesión'
              onPress={manejarInicioSesion}
            />

            <Boton
              texto='Volver al inicio'
              onPress={() => router.back()}
            />

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 40,
    paddingBottom: 100
  },
  buttonContainer: {
    gap: 15,
    marginTop: 30
  },
  keyboardView: {
    flex: 1,
    backgroundColor: '#FCE3EE'
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FCE3EE'
  }
});

export default LoginScreen;
