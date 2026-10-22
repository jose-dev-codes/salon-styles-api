import {
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Modal
} from 'react-native';

import { crearCita, obtenerServicios } from '@/services/citaService';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { actualizarCampo, limpiarError, limpiarCampos } from '@/utils/formularioUtils';
import { validarCita, ErroresCita } from '@/validators/citaValidator';
import { formatearPrecio } from '@/utils/formularioUtils';
import { SafeAreaView } from 'react-native-safe-area-context';

import Encabezado from '@/components/Encabezado';
import Boton from '@/components/Boton';
import CampoFormulario from '@/components/CampoFormulario';
import ModalExito from '@/components/ModalExito';
import MensajeError from '@/components/MensajeError';

const PantallaCrearCita = () => {
  const [idServicio, setIdServicio] = useState('');
  const [fechaCita, setFechaCita] = useState('');
  const [horaCita, setHoraCita] = useState('');
  const [especialistaCita, setEspecialistaCita] = useState('');
  const [servicios, setServicios] = useState<any[]>([]);
  const [modalServiciosVisible, setModalServiciosVisible] = useState(false);
  const [error, setError] = useState('');
  const [errores, setErrores] = useState<ErroresCita>({});
  const [mostrarExito, setMostrarExito] = useState(false);
  const [alturaEncabezado, setAlturaEncabezado] = useState(0);

  useEffect(() => {
    const cargarServicios = async () => {
      const resultado = await obtenerServicios();

      if (resultado) {
        setServicios(resultado.datos);
      }
    };

    cargarServicios();
  }, []);

  // Quita solo el error del campo que se está corrigiendo
  const limpiarErrorCampo = (campo: keyof ErroresCita) => {
    setErrores((anteriores) => ({ ...anteriores, [campo]: undefined }));
  };

  const limpiarErroresCampo = (campo: keyof ErroresCita) => {
    limpiarError(setError);
    limpiarErrorCampo(campo);
  };

  // Envía los datos de la cita al backend y muestra un mensaje si se crea correctamente.
  const guardarCita = async () => {
    limpiarError(setError);
    setErrores({});

    const datosLimpios = limpiarCampos({
      idServicio,
      fechaCita,
      horaCita,
      especialistaCita
    });

    const erroresValidacion = validarCita(
      datosLimpios.fechaCita,
      datosLimpios.horaCita,
      datosLimpios.especialistaCita,
      datosLimpios.idServicio
    );

    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    try {
      const resultado = await crearCita(
        datosLimpios.idServicio,
        datosLimpios.fechaCita,
        datosLimpios.horaCita,
        datosLimpios.especialistaCita
      );

      if (resultado && !resultado.respuesta.ok) {
        setError(resultado.datos.error);
        return;
      }

      if (resultado?.respuesta.ok) {
        setMostrarExito(true);
      }
    } catch (error) {
      console.error('Error al conectar con el sevidor.');
      setError('No se pudo conectar con el servidor.');
    }
  };


  return (
    <SafeAreaView style={styles.areaSegura}>
      <KeyboardAvoidingView
        style={styles.vistaTeclado}
        behavior="padding"
      >
        <View style={styles.encabezado}
          onLayout={(evento) =>
            setAlturaEncabezado(evento.nativeEvent.layout.height)
          }
        >
          <Encabezado titulo='Agendar cita' />
        </View>

        <ScrollView
          style={{
            paddingTop: alturaEncabezado + 40,
            marginTop: 15
          }}
          contentContainerStyle={styles.contenedor}
          keyboardShouldPersistTaps="handled"
        >

          <TouchableOpacity
            style={[
              styles.selectorServicio,
              errores.idServicio ? styles.selectorServicioError : null
            ]}
            onPress={() => {
              setModalServiciosVisible(true);
              limpiarErroresCampo('idServicio');
            }}
          >
            <Text style={styles.textoSelector}>
              {idServicio
                ? servicios.find(
                  (servicio) =>
                    servicio.id_servicio.toString() === idServicio
                  )?.nombre
                : 'Selecciona un servicio'
              }
            </Text>

            <Text style={[
              styles.flechaSelector,
              errores.idServicio ? { color: '#D63031' } : null
            ]}>▼</Text>
          </TouchableOpacity>

          {
            errores.idServicio
              ? <Text style={styles.mensajeError}>{errores.idServicio}</Text>
              : null
          }

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
              texto='Agendar'
              onPress={guardarCita}
            />
          </View>

        </ScrollView>

        <Modal
          visible={modalServiciosVisible}
          transparent
          animationType='fade'
          onRequestClose={() => setModalServiciosVisible(false)}
        >
          <View style={styles.fondoModal}>
            <View style={styles.modalServicios}>
              <Text style={styles.tituloModal}>
                Selecciona un servicio
              </Text>

              <ScrollView style={styles.listaServicios}>
                {servicios.map((servicio) => (
                  <TouchableOpacity
                    key={servicio.id_servicio}
                    style={styles.opcionServicio}
                    onPress={() => {
                      setIdServicio(servicio.id_servicio.toString())
                      setModalServiciosVisible(false)
                    }}
                  >
                    <View style={styles.filaServicio}>
                      <Text style={styles.textoOpcion}>
                        {servicio.nombre}
                      </Text>

                      <Text style={styles.textoOpcion}>
                        {formatearPrecio(servicio.costo)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TouchableOpacity
                style={styles.botonCerrarModal}
                onPress={() => setModalServiciosVisible(false)}
              >
                <Text style={styles.textoBotonCerrar}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <ModalExito
          visible={mostrarExito}
          mensaje='Cita creada correctamente.'
          onClose={() => router.replace('/citas')}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  selectorServicio: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#D922AC',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selectorServicioError: {
    borderColor: '#D63031',
    marginBottom: 4
  },
  textoSelector: {
    color: '#333333',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 21
  },
  flechaSelector: {
    color: '#D922AC',
    fontSize: 16,
    fontWeight: 'bold'
  },
  fondoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalServicios: {
    width: '88%',
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#FFFFFF'
  },
  tituloModal: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: 25,
    textAlign: 'center',
    color: '#E42BB8',
    marginBottom: 20
  },
  opcionServicio: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(228, 43, 184, 0.1)',
    borderColor: 'rgba(228, 43, 184, 0.10)',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 3
  },
  textoOpcion: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 22,
    color: '#D922AC',
  },
  botonCerrarModal: {
    marginTop: 15,
    paddingVertical: 13,
    borderRadius: 8,
    backgroundColor: '#E42BB8',
  },
  textoBotonCerrar: {
    fontSize: 15,
    lineHeight: 18,
    color: '#FFFFFF',
    fontFamily: 'Poppins_500Medium',
    textAlign: 'center',
  },
  listaServicios: {
    maxHeight: 300,
  },
  vistaTeclado: {
    flex: 1,
    backgroundColor: '#FCE3EE'
  },
  filaServicio: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contenedorBoton: {
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
  },
  mensajeError: {
    alignSelf: 'flex-start',
    marginBottom: 11,
    fontSize: 14,
    lineHeight: 18,
    color: '#D63031',
    fontFamily: 'Poppins_500Medium'
  }
});

export default PantallaCrearCita;
