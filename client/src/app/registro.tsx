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
import { validarRegistro, ErroresRegistro } from '@/validators/usuarioValidator';

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
  const [errores, setErrores] = useState<ErroresRegistro>({});
  const [alturaEncabezado, setAlturaEncabezado] = useState(0);

  const limpiarFormulario = () => {
    setNombresUsuario('');
    setApellidosUsuario('');
    setCorreoUsuario('');
    setContrasenaUsuario('');
    setNumeroTelefonoUsuario('');
    setFechaNacimientoUsuario('');
    setError('');
    setErrores({});
  };

  // Quita solo el error del campo que se está corrigiendo
  const limpiarErrorCampo = (campo: keyof ErroresRegistro) => {
    setErrores((anteriores) => ({ ...anteriores, [campo]: undefined }));
  };

  // Al escribir: limpia el error general y el error de ese campo
  const limpiarErroresCampo = (campo: keyof ErroresRegistro) => {
    limpiarError(setError);
    limpiarErrorCampo(campo);
  };

  const guardarInformacion = async () => {
    limpiarError(setError);
    setErrores({});

    const datosLimpios = limpiarCampos({
      nombresUsuario,
      apellidosUsuario,
      correoUsuario,
      contrasenaUsuario,
      numeroTelefonoUsuario,
      fechaNacimientoUsuario
    });

    const erroresValidacion = validarRegistro(
      datosLimpios.nombresUsuario,
      datosLimpios.apellidosUsuario,
      datosLimpios.correoUsuario,
      datosLimpios.contrasenaUsuario,
      datosLimpios.numeroTelefonoUsuario,
      datosLimpios.fechaNacimientoUsuario
    );

    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
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
            error={errores.nombres}
            onChangeText={(texto) =>
              actualizarCampo(texto, setNombresUsuario, () =>
                limpiarErroresCampo('nombres')
              )
            }
          />

          <CampoFormulario
            label='Apellidos'
            placeholder='Escribe tus apellidos'
            value={apellidosUsuario}
            icono='account-multiple-outline'
            error={errores.apellidos}
            onChangeText={(texto) =>
              actualizarCampo(texto, setApellidosUsuario, () =>
                limpiarErroresCampo('apellidos')
              )
            }
          />

          <CampoFormulario
            label='Correo'
            placeholder='ejemplo@correo.com'
            value={correoUsuario}
            keyboardType='email-address'
            autoCapitalize='none'
            icono='email-outline'
            error={errores.correo}
            onChangeText={(texto) =>
              actualizarCampo(texto, setCorreoUsuario, () =>
                limpiarErroresCampo('correo')
              )
            }
          />

          <CampoFormulario
            label='Contraseña'
            placeholder='Escribe tu contraseña'
            value={contrasenaUsuario}
            secureTextEntry
            icono='lock-outline'
            error={errores.contrasena}
            onChangeText={(texto) =>
              actualizarCampo(texto, setContrasenaUsuario, () =>
                limpiarErroresCampo('contrasena')
              )
            }
          />

          <CampoFormulario
            label='Número de teléfono'
            placeholder='Ej: 3001123456'
            value={numeroTelefonoUsuario}
            icono='phone-outline'
            error={errores.numeroTelefono}
            onChangeText={(texto) =>
              actualizarCampo(texto, setNumeroTelefonoUsuario, () =>
                limpiarErroresCampo('numeroTelefono')
              )
            }
          />

          <CampoFormulario
            label='Fecha de nacimiento'
            placeholder='AAAA-MM-DD'
            value={fechaNacimientoUsuario}
            icono='calendar-outline'
            error={errores.fechaNacimiento}
            onChangeText={(texto) =>
              actualizarCampo(texto, setFechaNacimientoUsuario, () =>
                limpiarErroresCampo('fechaNacimiento')
              )
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
