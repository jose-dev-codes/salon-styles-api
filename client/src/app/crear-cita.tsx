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
import { validarCita } from '@/validators/citaValidator';
import Boton from '@/components/Boton';
import CampoFormulario from '@/components/CampoFormulario';
import ModalExito from '@/components/ModalExito';
import MensajeError from '@/components/MensajeError';
import { formatearPrecio } from '@/utils/formularioUtils';
import Encabezado from '@/components/Encabezado';
import { SafeAreaView } from 'react-native-safe-area-context';

const PantallaCrearCita = () => {
  const [idServicio, setIdServicio] = useState('');
  const [fechaCita, setFechaCita] = useState('');
  const [horaCita, setHoraCita] = useState('');
  const [especialistaCita, setEspecialistaCita] = useState('');
  const [servicios, setServicios] = useState<any[]>([]);
  const [modalServiciosVisible, setModalServiciosVisible] = useState(false);
  const [error, setError] = useState('');
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

  // Envía los datos de la cita al backend y muestra un mensaje si se crea correctamente.
  const guardarCita = async () => {
    limpiarError(setError);

    const datosLimpios = limpiarCampos({
      idServicio,
      fechaCita,
      horaCita,
      especialistaCita
    });

    const errorValidacion = validarCita(
      datosLimpios.fechaCita,
      datosLimpios.horaCita,
      datosLimpios.especialistaCita,
      datosLimpios.idServicio
    );

    if (errorValidacion) {
      setError(errorValidacion);
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
            style={styles.selectorServicio}
            onPress={() => setModalServiciosVisible(true)}
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

            <Text style={styles.flechaSelector}>▼</Text>
          </TouchableOpacity>

          <CampoFormulario
            label='Fecha'
            placeholder='AAAA-MM-DD'
            value={fechaCita}
            icono='calendar-outline'
            onChangeText={(texto) =>
              actualizarCampo(texto, setFechaCita, setError)
            }
          />

          <CampoFormulario
            label='Hora'
            placeholder='HH:MM'
            value={horaCita}
            icono='clock-outline'
            onChangeText={(texto) =>
              actualizarCampo(texto, setHoraCita, setError)
            }
          />

          <CampoFormulario
            label='Especialista'
            placeholder='Nombre del especialista'
            value={especialistaCita}
            icono='account-outline'
            onChangeText={(texto) =>
              actualizarCampo(texto, setEspecialistaCita, setError)
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
  textoSelector: {
    color: '#333333',
    fontSize: 16
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
    width: '85%',
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#D922AC',
  },
  tituloModal: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#E42BB8',
    marginBottom: 15,
  },
  opcionServicio: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D922AC',
  },
  textoOpcion: {
    fontSize: 16,
    color: '#D922AC',
  },
  botonCerrarModal: {
    marginTop: 15,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#E42BB8',
  },
  textoBotonCerrar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
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
  }
});

export default PantallaCrearCita;
