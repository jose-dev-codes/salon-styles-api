import {
  Alert,
  StyleSheet,
  Text,
  ScrollView,
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


const RegistroScreen = () => {
  const [nombresUsuario, setNombresUsuario] = useState('');
  const [apellidosUsuario, setApellidosUsuario] = useState('');
  const [correoUsuario, setCorreoUsuario] = useState('');
  const [contrasenaUsuario, setContrasenaUsuario] = useState('');
  const [numeroTelefonoUsuario, setNumeroTelefonoUsuario] = useState('');
  const [fechaNacimientoUsuario, setFechaNacimientoUsuario] = useState('');
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

      Alert.alert(
        'Exito',
        'Usuario registrado correctamente!',
        [
          {
            text: 'aceptar',
            onPress: () => router.replace('/login')
          }
        ]
      );
    } catch (error) {
      console.error('Error al conectar con el servidor', error);
      setError('No se pudo conectar con el servidor.');
    }

  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior="padding"
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Registro</Text>

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

        {error && <Text style={styles.error}>{error}</Text>}

        <Boton
          texto='Registrarse'
          onPress={guardarInformacion}
        />

      </ScrollView>
    </KeyboardAvoidingView>
  );

};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    paddingBottom: 100
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#E42BB8'
  },
  error: {
    marginBottom: 15,
    color: 'red'
  },
  keyboardView: {
    flex: 1,
    backgroundColor: '#FCE3EE'
  }
});

export default RegistroScreen;
