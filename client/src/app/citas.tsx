import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

import {
  formatearFechaLarga,
  formatearPrecio,
  formatearHora12
} from '@/utils/formularioUtils';

import { cancelarCita, obtenerMisCitas } from '@/services/citaService';
import { useCallback, useState } from 'react';
import { useFocusEffect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  IconCalendarEvent,
  IconCircleX,
  IconClockHour8,
  IconCoins,
  IconClockQuestion
} from '@tabler/icons-react-native';

import MaskedView from '@react-native-masked-view/masked-view';
import BarraNavegacion from '@/components/BarraNavegacion';
import Encabezado from '@/components/Encabezado';
import Boton from '@/components/Boton';
import BotonTarjeta from '@/components/BotonTarjeta';
import ModalExito from '@/components/ModalExito';

type Cita = {
  id_cita: number;
  id_servicio: number;
  id_usuario: number;
  fecha: string;
  hora: string;
  especialista: string;
  estado: string;
  servicio: string;
  precio: number
};

const obtenerIconoEstado = (estado: string) => {
  if (estado === 'cancelada') {
    return {
      icono: IconCircleX,
      color: '#D63031'
    };
  }

  return {
    icono: IconClockQuestion,
    color: '#D922AC'
  };
};

const PantallaCitas = () => {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState<number | null>(null);
  const [mostrarExito, setMostrarExito] = useState(false);
  const [posicionScroll, setScrollY] = useState(0);
  const [altoIndicador, setPosicionScroll] = useState(0);

  // Consulta las citas del usuario y actualiza la lista.
  const cargarCitas = async () => {
    const resultado = await obtenerMisCitas();

    if (resultado) {
      setCitas(resultado.datos);
    }
  };

  const confirmarCancelacion = async (id: number) => {
    const resultado = await cancelarCita(id.toString());

    if (resultado?.respuesta.ok) {
      setMostrarExito(true);
      return;
    }

    Alert.alert(
      'Error',
      resultado?.datos.error ?? 'No se pudo cancelar la cita.'
    );
  };

  const mostrarConfirmacionCancelacion = (id: number) => {
    setCitaSeleccionada(id);
    setModalVisible(true);
  };

  useFocusEffect(
    useCallback(() => {
      cargarCitas();
    }, [])
  );

  return (
    <SafeAreaView style={styles.areaSegura}>
      <View style={styles.encabezado}>
        <Encabezado titulo='Mis citas' />
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType='fade'
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.fondoModal}>
          <View style={styles.modal}>
            <Text style={styles.tituloModal}>Cancelar cita</Text>

            <Text style={styles.mensajeModal}>
              ¿Estás seguro de que deseas cancelar esta cita?
            </Text>

            <Text style={styles.advertenciaModal}>
              Si confirmas, no podrás reagendarla.
            </Text>

            <View style={styles.botonesModal}>
              <TouchableOpacity
                style={styles.botonNo}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textoBotonNo}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botonSi}
                onPress={() => {
                  setModalVisible(false);
                  if (citaSeleccionada !== null) {
                    confirmarCancelacion(citaSeleccionada);
                  }
                }}
              >
                <Text style={styles.textoBotonSi}>Sí, cancelar</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>

      <ModalExito
        visible={mostrarExito}
        mensaje='Cita cancelada con exito.'
        onClose={() => {
          setMostrarExito(false);
          cargarCitas();
        }}
      />

      <View style={styles.acciones}>
        <Boton
          texto='Nueva cita'
          onPress={() => router.push('/crear-cita')}
          flex={1}
          borderRadius={50}
        />

        <Boton
          texto='Historial'
          onPress={() => {}}
          flex={1}
          borderRadius={50}
          variante='secundario'
        />
      </View>

      {citas.length > 0 && (
        <MaskedView
          style={{ flex: 1 }}
          maskElement={
            <LinearGradient
              colors={[
                'transparent',
                'black',
                'black',
                'transparent'
              ]}
              locations={[0, 0.015, 0.985, 1]}
              style={{ flex: 1 }}
            />
          }
        >
          <ScrollView
            style={{
              paddingHorizontal: 15,
              alignSelf: 'stretch',
              backgroundColor: '#FCE3EE',
              paddingTop: 25
            }}
            showsVerticalScrollIndicator={false}
            onScroll={(evento) => setScrollY(evento.nativeEvent.contentOffset.y)}
            scrollEventThrottle={16}
            contentContainerStyle={styles.contenedor}
          >

            {citas.map((cita) => (
              <View
                key={cita.id_cita}
                style={styles.cita}
              >

                <View style={styles.contenedorCita}>
                  <View style={styles.encabezadoCita}>
                    <View style={styles.perfilCita}>
                      <MaterialCommunityIcons
                        name='account-check-outline'
                        size={22}
                        color='#D922AC'
                      />
                    </View>

                    <View>
                      <Text style={styles.nombreServicio}>{cita.servicio}</Text>
                      <Text style={styles.especialistaCita}>con {cita.especialista}</Text>
                    </View>
                  </View>

                  <View style={styles.separador} />

                  <View
                    style={styles.filaDatos}>
                    <View style={styles.filaConIcono}>
                      <IconCalendarEvent
                        size={23}
                        color='#D922AC'
                        strokeWidth={1.5}
                      />

                      <Text style={styles.valorConIcono}>
                        {formatearFechaLarga(cita.fecha)}
                      </Text>
                    </View>

                    <View style={styles.filaConIcono}>
                      <IconClockHour8
                        size={23}
                        color="#E42BB8"
                        strokeWidth={1.5}
                      />

                      <Text style={styles.valorConIcono}>
                        {formatearHora12(cita.hora)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.filaDatos}>
                    <View style={styles.filaConIcono}>
                      <IconCoins
                        size={23}
                        color="#E42BB8"
                        strokeWidth={1.5}
                      />

                      <Text style={styles.valorConIcono}>{formatearPrecio(cita.precio)}</Text>
                    </View>

                    <View style={styles.filaConIcono}>

                      {(() => {
                        const { icono: Icono, color } = obtenerIconoEstado(cita.estado);

                        return (
                          <Icono
                            size={23}
                            color={color}
                            strokeWidth={1.5}
                          />
                        );
                      })()}

                      <Text style={styles.valorConIcono}>{cita.estado}</Text>
                    </View>
                  </View>
                </View>

                {cita.estado !== 'cancelada' && (
                    <View style={styles.botones}>
                      <BotonTarjeta
                        texto='Reagendar'
                        onPress={() =>
                          router.push({
                            pathname: '/editar-cita',
                            params: {
                              id: cita.id_cita.toString(),
                              fecha: cita.fecha,
                              hora: cita.hora,
                              especialista: cita.especialista
                            }
                          })
                        }
                        flex={1}
                      />

                      <BotonTarjeta
                        texto='Cancelar'
                        onPress={() => mostrarConfirmacionCancelacion(cita.id_cita)}
                        flex={1}
                        variante='peligro'
                      />

                    </View>
                  )}
              </View>
            ))}
          </ScrollView>
        </MaskedView>
      )}

      {citas.length === 0 && (
        <View
          style={styles.citasVacia}>
          <Image
            source={require('@/assets/images/avatar-sin-citas.png')}
            style={styles.imagenVacia}
          />
          <Text style={styles.mensajeVacio}>¡No tienes citas agendadas!</Text>
        </View>
      )}

      {citas.length > 0 && (
        <View
          style={styles.indicadorScroll}
          onLayout={(evento) =>
            setPosicionScroll(evento.nativeEvent.layout.height)
          }
        >
          <View
            style={[
              styles.barraScroll,
              {
                transform: [
                  {
                    translateY: Math.min(
                      posicionScroll,
                      altoIndicador - 100
                    )
                  }]
              }
            ]}
          />
      </View>
      )}

      <View style={styles.navegacion}>
        <BarraNavegacion />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    paddingBottom: 100,
    paddingHorizontal: 5
  },
  encabezado: {
    marginTop: 5
  },
  acciones: {
    marginHorizontal: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 15,
    marginTop: 15,
    marginBottom: 10
  },
  contenedorCita: {
    gap: 5
  },
  cita: {
    width: '100%',
    paddingVertical: 13,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderColor: 'rgba(217, 34, 172, 0.25)',
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    gap: 5,
    boxShadow: '0px 0px 4px 1px rgba(0, 0, 0, 0.04)',
  },
  encabezadoCita: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  perfilCita: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    backgroundColor: 'rgba(228, 43, 184, 0.20)',
    borderColor: 'rgba(228, 43, 184, 0.40)',
    borderWidth: 1,
    borderRadius: 100
  },
  nombreServicio: {
    fontSize: 17,
    fontFamily: 'Poppins_600SemiBold',
    color: '#E42BB8',
    lineHeight: 21,
    marginBottom: 5
  },
  especialistaCita: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    lineHeight: 16,
    color: '#9F167C'
  },
  separador: {
    height: 1,
    backgroundColor: 'rgba(217, 34, 172, 0.30)',
    marginVertical: 5
  },
  filaDatos: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20
  },
  filaConIcono: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  valorConIcono: {
    fontSize: 14,
    color: '#9F167C',
    fontFamily: 'Poppins_400Regular',
    lineHeight: 18
  },
  botones: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12
  },
  fondoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modal: {
    width: '88%',
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  tituloModal: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: 24,
    textAlign: 'center',
    color: '#E42BB8',
    marginBottom: 12,
  },
  mensajeModal: {
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 15,
  },
  advertenciaModal: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    lineHeight: 18,
    color: '#D63031',
    marginBottom: 25
  },
  botonesModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  botonNo: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D922AC',
  },
  botonSi: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#E42BB8',
  },
  textoBotonNo: {
    color: '#D922AC',
    justifyContent: 'center',
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    lineHeight: 20
  },
  textoBotonSi: {
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    lineHeight: 20
  },
  citasVacia: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15
  },
  imagenVacia: {
    width: 130,
    height: 135,
    marginBottom: 15
  },
  mensajeVacio: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    lineHeight: 21,
    textAlign: 'center',
    color: '#E42BB8'
  },
  areaSegura: {
    flex: 1,
    backgroundColor: '#FCE3EE'
  },
  indicadorScroll: {
    position: 'absolute',
    right: 3,
    top: 150,
    height: '50%',
    width: 3,
  },
  barraScroll: {
    width: '100%',
    height: 100,
    backgroundColor: '#E42BB8',
    borderRadius: 3,
  },
  navegacion: {
    marginTop: 5,
    marginBottom: 5
  }
});

export default PantallaCitas;
