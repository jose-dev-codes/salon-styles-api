import {
  StyleSheet,
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
import CampoFormulario from '@/components/CampoFormulario';
import ModalExito from '@/components/ModalExito';
import MensajeError from '@/components/MensajeError';
import Encabezado from '@/components/Encabezado';
import { SafeAreaView } from 'react-native-safe-area-context';

const PantallaRegistro = () => {
  const [nombresUsuario, setNombresUsuario] = useState('');
  const [apellidosUsuario, setApellidosUsuario] = useState('');
  const [correoUsuario, setCorreoUsuario] = useState('');
  const [contrasenaUsuario, setContrasenaUsuario] = useState('');
  const [numeroTelefonoUsuario, setNumeroTelefonoUsuario] = useState('');
  const [fechaNacimientoUsuario, setFechaNacimientoUsuario] = useState('');
  const [mostrarExito, setMostrarExito] = useState(false);
  const [error, setError] = useState('');
  const [alturaEncabezado, setAlturaEncabezado] = useState(0);

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
      console.error('Error al conectar con el servidor.', error);
      setError('No se pudo conectar con el servidor.');
    }

  };

  return (
    <SafeAreaView style={styles.areaSegura}>
      <KeyboardAvoidingView
        style={styles.vistaTeclado}
        behavior="padding"
      >
        <View
          style={styles.encabezado}
          onLayout={(evento =>
            setAlturaEncabezado(evento.nativeEvent.layout.height))
          }
        >
          <Encabezado titulo='Registro' />
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
            label='Nombres'
            placeholder='Escribe tus nombres'
            value={nombresUsuario}
            icono='account-outline'
            onChangeText={(texto) =>
              actualizarCampo(texto, setNombresUsuario, setError)
            }
          />

          <CampoFormulario
            label='Apellidos'
            placeholder='Escribe tus apellidos'
            value={apellidosUsuario}
            icono='account-multiple-outline'
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
            icono='email-outline'
            onChangeText={(texto) =>
              actualizarCampo(texto, setCorreoUsuario, setError)
            }
          />

          <CampoFormulario
            label='Contraseña'
            placeholder='Escribe tu contraseña'
            value={contrasenaUsuario}
            secureTextEntry
            icono='lock-outline'
            onChangeText={(texto) =>
              actualizarCampo(texto, setContrasenaUsuario, setError)
            }
          />

          <CampoFormulario
            label='Número de teléfono'
            placeholder='Ej: 3001123456'
            value={numeroTelefonoUsuario}
            icono='phone-outline'
            onChangeText={(texto) =>
              actualizarCampo(texto, setNumeroTelefonoUsuario, setError)
            }
          />

          <CampoFormulario
            label='Fecha de nacimiento'
            placeholder='AAAA-MM-DD'
            value={fechaNacimientoUsuario}
            icono='calendar-outline'
            onChangeText={(texto) =>
              actualizarCampo(texto, setFechaNacimientoUsuario, setError)
            }
          />

          {error && <MensajeError mensaje={error} />}

          <View style={styles.contenedorBotones}>
            <Boton
              texto='Registrarse'
              onPress={guardarInformacion}
            />
          </View>

        </ScrollView>

        <ModalExito
          visible={mostrarExito}
          mensaje='Usuario registrado correctamente.'
          onClose={() => router.replace('/login')}
        />

      </KeyboardAvoidingView>
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  contenedor: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 120
  },
  vistaTeclado: {
    flex: 1,
    backgroundColor: '#FCE3EE'
  },
  contenedorBotones: {
    marginTop: 30
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

export default PantallaRegistro;
