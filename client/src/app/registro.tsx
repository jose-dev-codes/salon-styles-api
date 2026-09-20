import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  KeyboardAvoidingView
} from 'react-native';

import {
  actualizarCampo,
  limpiarCampos,
  limpiarError
} from '@/utils/formularioUtils';

import { router } from 'expo-router';
import { useState } from 'react';
import { registrarUsuario } from '@/services/usuarioService';
import { validarRegistro } from '@/validators/usuarioValidator';

import Boton from '@/components/Boton';
import CampoFormulario from '@/components/campoFormulario';
import ModalExito from '@/components/ModalExito';
import MensajeError from '@/components/MensajeError';
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

const RegistroScreen = () => {
  const [nombresUsuario, setNombresUsuario] = useState('');
  const [apellidosUsuario, setApellidosUsuario] = useState('');
  const [correoUsuario, setCorreoUsuario] = useState('');
  const [contrasenaUsuario, setContrasenaUsuario] = useState('');
  const [numeroTelefonoUsuario, setNumeroTelefonoUsuario] = useState('');
  const [fechaNacimientoUsuario, setFechaNacimientoUsuario] = useState('');
  const [mostrarExito, setMostrarExito] = useState(false);
  const [error, setError] = useState('');

  const limpiarFormulario = () => {
    setNombresUsuario('');
    setApellidosUsuario('');
    setCorreoUsuario('');
    setContrasenaUsuario('');
    setNumeroTelefonoUsuario('');
    setFechaNacimientoUsuario('');
    setError('');
  };

  const guardarInformacion = async () => {
    limpiarError(setError);

    const datosLimpios = limpiarCampos({
      nombresUsuario,
      apellidosUsuario,
      correoUsuario,
      contrasenaUsuario,
      numeroTelefonoUsuario,
      fechaNacimientoUsuario
    });

    const mensajeValidacion = validarRegistro(
      datosLimpios.nombresUsuario,
      datosLimpios.apellidosUsuario,
      datosLimpios.correoUsuario,
      datosLimpios.contrasenaUsuario,
      datosLimpios.numeroTelefonoUsuario,
      datosLimpios.fechaNacimientoUsuario
    );

    if (mensajeValidacion) {
      setError(mensajeValidacion);
      return;
    }

    try {
      const resultado = await registrarUsuario(
        datosLimpios.nombresUsuario,
        datosLimpios.apellidosUsuario,
        datosLimpios.correoUsuario,
        datosLimpios.contrasenaUsuario,
        datosLimpios.numeroTelefonoUsuario,
        datosLimpios.fechaNacimientoUsuario
      );

      if (!resultado?.respuesta.ok) {
        setError(resultado.datos.error);
        return;
      }

      limpiarFormulario();

      setMostrarExito(true);

    } catch (error) {
      console.error('Error al conectar con el servidor', error);
      setError('No se pudo conectar con el servidor.');
    }

  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior="padding"
      >
        <Header titulo='Registro' />

        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >

          <CampoFormulario
            label='Nombres'
            placeholder='Escribe tu nombre'
            value={nombresUsuario}
            onChangeText={(texto) =>
              actualizarCampo(texto, setNombresUsuario, setError)
            }
          />

          <CampoFormulario
            label='Apellidos'
            placeholder='Escribe tu apellido'
            value={apellidosUsuario}
            onChangeText={(texto) =>
              actualizarCampo(texto, setApellidosUsuario, setError)
            }
          />

          <CampoFormulario
            label='Correo'
            placeholder='ejemplo@correo.com'
            value={correoUsuario}
            keyboardType='email-address'
            autoCapitalize='none'
            onChangeText={(texto) =>
              actualizarCampo(texto, setCorreoUsuario, setError)
            }
          />

          <CampoFormulario
            label='Contraseña'
            placeholder='Escribe tu contraseña'
            value={contrasenaUsuario}
            secureTextEntry
            onChangeText={(texto) =>
              actualizarCampo(texto, setContrasenaUsuario, setError)
            }
          />

          <CampoFormulario
            label='Número de teléfono'
            placeholder='Ej: 3001123456'
            value={numeroTelefonoUsuario}
            onChangeText={(texto) =>
              actualizarCampo(texto, setNumeroTelefonoUsuario, setError)
            }
          />

          <CampoFormulario
            label='Fecha de nacimiento'
            placeholder='AAAA-MM-DD'
            value={fechaNacimientoUsuario}
            onChangeText={(texto) =>
              actualizarCampo(texto, setFechaNacimientoUsuario, setError)
            }
          />

          {error && <MensajeError mensaje={error} />}

          <View style={styles.buttonContainer}>
            <Boton
              texto='Registrarse'
              onPress={guardarInformacion}
            />
          </View>

        </ScrollView>

        <ModalExito
          visible={mostrarExito}
          mensaje='Usuario registrado correctamente'
          onClose={() => router.replace('/login')}
        />

      </KeyboardAvoidingView>
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 40,
    justifyContent: 'center',
    paddingBottom: 100
  },
  keyboardView: {
    flex: 1,
    backgroundColor: '#FCE3EE'
  },
  buttonContainer: {
    marginTop: 30
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FCE3EE'
  }
});

export default RegistroScreen;
