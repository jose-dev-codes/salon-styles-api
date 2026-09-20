import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';

import {
  actualizarCampo,
  limpiarCampos,
  limpiarError,
  formatearHora,
  formatearFecha
} from '@/utils/formularioUtils';

import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { actualizarCita } from '@/services/citaService';
import { validarCita } from '@/validators/citaValidator';
import Boton from '@/components/Boton';
import CampoFormulario from '@/components/campoFormulario';
import ModalExito from '@/components/ModalExito';
import MensajeError from '@/components/MensajeError';
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditarCitaScreen = () => {
  const [fechaCita, setFechaCita] = useState('');
  const [horaCita, setHoraCita] = useState('');
  const [especialistaCita, setEspecialistaCita] = useState('');
  const [error, setError] = useState('');
  const [mostrarExito, setMostrarExito] = useState(false);

  const { id, fecha, hora, especialista } = useLocalSearchParams();

  useEffect(() => {
    if (fecha) setFechaCita(formatearFecha(fecha.toString()));
    if (hora) setHoraCita(formatearHora(hora.toString()));
    if (especialista) setEspecialistaCita(especialista.toString());
  }, [fecha, hora, especialista]);

  // Envía los cambios al backend y muestra un mensaje si la actualización es exitosa.
  const guardarCambios = async () => {
    limpiarError(setError);

    const datosLimpios = limpiarCampos({
      fechaCita,
      horaCita,
      especialistaCita
    });

    const errorValidacion = validarCita(
      datosLimpios.fechaCita,
      datosLimpios.horaCita,
      datosLimpios.especialistaCita
    );

    if (errorValidacion) {
      setError(errorValidacion);
      return;
    }

    try {
      const resultado = await actualizarCita(
        id.toString(),
        datosLimpios.fechaCita,
        datosLimpios.horaCita,
        datosLimpios.especialistaCita
      );

      if (!resultado?.respuesta.ok) {
        setError(resultado?.datos.error);
        return;
      }

      setMostrarExito(true);

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
        <Header titulo='Editar cita' />

        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >

          <CampoFormulario
            label='Fecha'
            placeholder='AAAA-MM-DD'
            value={fechaCita}
            onChangeText={(texto) =>
              actualizarCampo(texto, setFechaCita, setError)
            }
          />

          <CampoFormulario
            label='Hora'
            placeholder='HH:MM'
            value={horaCita}
            onChangeText={(texto) =>
              actualizarCampo(texto, setHoraCita, setError)
            }
          />

          <CampoFormulario
            label='Especialista'
            placeholder='Nombre del especialista'
            value={especialistaCita}
            onChangeText={(texto) =>
              actualizarCampo(texto, setEspecialistaCita, setError)
            }
          />

          {error && <MensajeError mensaje={error} />}

          <View style={styles.contenedorBoton}>
            <Boton
              texto='Guardar cambios'
              onPress={guardarCambios}
            />
          </View>

        </ScrollView>

        <ModalExito
          visible={mostrarExito}
          mensaje='Cita actualizada correctamente'
          onClose={() => router.back()}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    paddingTop: 40,
    paddingBottom: 100
  },
  keyboardView: {
    flex: 1,
    backgroundColor: '#FCE3EE'
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FCE3EE'
  },
  contenedorBoton: {
    marginTop: 30
  }
});

export default EditarCitaScreen;
