import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  ScrollView
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

const EditarCitaScreen = () => {
  const [fechaCita, setFechaCita] = useState('');
  const [horaCita, setHoraCita] = useState('');
  const [especialistaCita, setEspecialistaCita] = useState('');
  const [error, setError] = useState('');

  const { id, fecha, hora, especialista } = useLocalSearchParams();

  useEffect(() => {
    if (fecha) setFechaCita(formatearFecha(fecha.toString()));
    if (hora) setHoraCita(formatearHora(hora.toString()));
    if (especialista) setEspecialistaCita(especialista.toString());
  }, [fecha, hora, especialista]);

  // Envía los cambios al backend y vuelve a la lista si la actualización es exitosa.
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

      router.back();
    } catch (error) {
      console.error('Error al conectar con el servidor', error);
      setError('No se pudo conectar con el servidor');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior='padding'
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Editar cita</Text>

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

        {error && (<Text style={styles.error}>{error}</Text>)}

        <Boton
          texto='Guardar cambios'
          onPress={guardarCambios}
        />

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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

export default EditarCitaScreen;
