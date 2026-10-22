import {
  KeyboardAvoidingView,
  StyleSheet,
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
import { validarCita, ErroresCita } from '@/validators/citaValidator';
import { SafeAreaView } from 'react-native-safe-area-context';

import Boton from '@/components/Boton';
import CampoFormulario from '@/components/CampoFormulario';
import ModalExito from '@/components/ModalExito';
import MensajeError from '@/components/MensajeError';
import Encabezado from '@/components/Encabezado';


const PantallaEditarCita = () => {
  const [fechaCita, setFechaCita] = useState('');
  const [horaCita, setHoraCita] = useState('');
  const [especialistaCita, setEspecialistaCita] = useState('');
  const [error, setError] = useState('');
  const [errores, setErrores] = useState<ErroresCita>({});
  const [mostrarExito, setMostrarExito] = useState(false);
  const [alturaEncabezado, setAlturaEncabezado] = useState(0);

  const { id, fecha, hora, especialista } = useLocalSearchParams();

  useEffect(() => {
    if (fecha) setFechaCita(formatearFecha(fecha.toString()));
    if (hora) setHoraCita(formatearHora(hora.toString()));
    if (especialista) setEspecialistaCita(especialista.toString());
  }, [fecha, hora, especialista]);

  // Quita solo el error del campo que se está corrigiendo
  const limpiarErrorCampo = (campo: keyof ErroresCita) => {
    setErrores((anteriores) => ({ ...anteriores, [campo]: undefined }));
  };

  const limpiarErroresCampo = (campo: keyof ErroresCita) => {
    limpiarError(setError);
    limpiarErrorCampo(campo);
  };

  // Envía los cambios al backend y muestra un mensaje si la actualización es exitosa.
  const guardarCambios = async () => {
    limpiarError(setError);
    setErrores({});

    const datosLimpios = limpiarCampos({
      fechaCita,
      horaCita,
      especialistaCita
    });

    const erroresValidacion = validarCita(
      datosLimpios.fechaCita,
      datosLimpios.horaCita,
      datosLimpios.especialistaCita
    );

    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
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
          <Encabezado titulo='Reagendar cita' />
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
            label='Fecha'
            placeholder='AAAA-MM-DD'
            value={fechaCita}
            icono='calendar-outline'
            error={errores.fechaCita}
            onChangeText={(texto) =>
              actualizarCampo(texto, setFechaCita, () =>
                limpiarErroresCampo('fechaCita')
              )
            }
          />

          <CampoFormulario
            label='Hora'
            placeholder='HH:MM'
            value={horaCita}
            icono='clock-outline'
            error={errores.horaCita}
            onChangeText={(texto) =>
              actualizarCampo(texto, setHoraCita, () =>
                limpiarErroresCampo('horaCita')
              )
            }
          />

          <CampoFormulario
            label='Especialista'
            placeholder='Nombre del especialista'
            value={especialistaCita}
            icono='account-outline'
            error={errores.especialistaCita}
            onChangeText={(texto) =>
              actualizarCampo(texto, setEspecialistaCita, () =>
                limpiarErroresCampo('especialistaCita')
              )
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
          mensaje='Cita actualizada con exito.'
          onClose={() => router.back()}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 100
  },
  vistaTeclado: {
    flex: 1,
    backgroundColor: '#FCE3EE'
  },
  areaSegura: {
    flex: 1,
    backgroundColor: '#FCE3EE'
  },
  contenedorBoton: {
    marginTop: 30
  },
  encabezado: {
    position: 'absolute',
    top: 5,
    left: 0,
    right: 0,
    zIndex: 1
  }
});

export default PantallaEditarCita;
