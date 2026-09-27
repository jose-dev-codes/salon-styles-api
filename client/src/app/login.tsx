import {
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
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
import CampoFormulario from '@/components/CampoFormulario';
import MensajeError from '@/components/MensajeError';
import Encabezado from '@/components/Encabezado';
import { SafeAreaView } from 'react-native-safe-area-context';

const PantallaLogin = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [alturaEncabezado, setAlturaEncabezado] = useState(0);

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
      console.error('Error al conectar con el servidor.', error);
      setError('No se pudo conectar con el servidor.');
    }
  };

  return (
    <SafeAreaView style={styles.areaSegura}>
      <KeyboardAvoidingView
        style={styles.vistaTeclado}
        behavior='padding'
      >
        <View
          style={styles.encabezado}
          onLayout={(evento) =>
            setAlturaEncabezado(evento.nativeEvent.layout.height)
          }
        >
          <Encabezado titulo='Inicio de sesión' />
        </View>

        <ScrollView
          style={{
            paddingTop: alturaEncabezado + 40,
            marginTop: 5
          }}
          contentContainerStyle={styles.contenedor}
          keyboardShouldPersistTaps="handled"
        >

          <CampoFormulario
            label='Correo electrónico'
            placeholder='ejemplo@correo.com'
            value={correo}
            keyboardType='email-address'
            autoCapitalize='none'
            icono='email-outline'
            onChangeText={(texto) =>
              actualizarCampo(texto, setCorreo, setError)
            }
          />

          <CampoFormulario
            label='Contraseña'
            placeholder='Ingresa tu contraseña'
            value={contrasena}
            secureTextEntry
            icono='lock-outline'
            onChangeText={(texto) =>
              actualizarCampo(texto, setContrasena, setError)
            }
          />

          {error && <MensajeError mensaje={error} />}

          <View style={styles.contenedorBotones}>

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
  contenedor: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 100
  },
  contenedorBotones: {
    gap: 15,
    marginTop: 30
  },
  vistaTeclado: {
    flex: 1,
    backgroundColor: '#FCE3EE'
  },
  areaSegura: {
    flex: 1,
    backgroundColor: '#FCE3EE'
  },
  encabezado: {
    position: 'absolute',
    top: 5,
    left: 0,
    right: 0,
    zIndex: 1
  }
});

export default PantallaLogin;
