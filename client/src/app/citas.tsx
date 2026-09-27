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

import { cancelarCita, obtenerMisCitas } from '@/services/citaService';
import { useCallback, useState } from 'react';
import { useFocusEffect, router } from 'expo-router';
import { formatearHora, formatearPrecio } from '@/utils/formularioUtils';
import Boton from '@/components/Boton';
import BotonTarjeta from '@/components/BotonTarjeta';
import ModalExito from '@/components/ModalExito';
import Encabezado from '@/components/Encabezado';
import { SafeAreaView } from 'react-native-safe-area-context';
import BarraNavegacion from '@/components/BarraNavegacion';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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

const formatearFecha = (fecha: string) => {
  const fechaFormateada = new Date(fecha);

  return fechaFormateada.toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long'
  });
};

const obtenerIconoEstado = (estado: string): {
  nombre: keyof typeof MaterialCommunityIcons.glyphMap,
  color: string
} => {
  if (estado === 'cancelada') {
    return { nombre: 'close-circle-outline', color: '#D63031' };
  }

  return { nombre: 'clock-outline', color: '#D922AC' };
};

const formatearHora12 = (hora: string) => {
  const horaRecortada = formatearHora(hora);
  const [horas, minutos] = horaRecortada.split(':');
  const horasNumero = parseInt(horas, 10);

  const periodo = horasNumero >= 12 ? 'p.m.' : 'a.m.';
  const horas12 = horasNumero % 12 === 0 ? 12 : horasNumero % 12;

  return `${horas12}:${minutos} ${periodo}`;
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
            <Text style={styles.tituloModal}>Cancelar Cita</Text>

            <Text style={styles.mensajeModal}>
              ¿Estás seguro de que deseas cancelar esta cita?
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
        mensaje='Cita cancelada correctamente.'
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
              locations={[0, 0.02, 0.98, 1]}
              style={{ flex: 1 }}
            />
          }
        >
          <ScrollView
            style={{
              marginHorizontal: 20,
              alignSelf: 'stretch',
              backgroundColor: 'transparent',
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

                <Text style={styles.nombreServicio}>{cita.servicio}</Text>

                <View style={styles.filaConIcono}>
                  <MaterialCommunityIcons
                    name='account-outline'
                    size={22}
                    color='#D922AC'
                  />
                  <Text style={styles.valorConIcono}>{cita.especialista}</Text>
                </View>

                <View style={styles.filaConIcono}>
                  <MaterialCommunityIcons
                    name='calendar-outline'
                    size={22}
                    color='#D922AC'
                  />
                  <Text style={styles.valorConIcono}>
                    {formatearFecha(cita.fecha)} — {formatearHora12(cita.hora)}
                  </Text>
                </View>

                <View style={styles.filaConIcono}>
                  <MaterialCommunityIcons
                    name='cash-multiple'
                    size={22}
                    color='#D922AC'
                  />
                  <Text style={styles.valorConIcono}>{formatearPrecio(cita.precio)}</Text>
                </View>

                <View style={styles.filaConIcono}>
                  <MaterialCommunityIcons
                    name={obtenerIconoEstado(cita.estado).nombre}
                    size={22}
                    color={obtenerIconoEstado(cita.estado).color}
                  />

                  <Text style={styles.valorConIcono}>{cita.estado}</Text>
                </View>

                {cita.estado !== 'cancelada' && (
                  <View style={styles.botones}>
                    <BotonTarjeta
                      texto='Actualizar'
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
          style={styles.vacio}>
          <Image
            source={require('@/assets/images/avatar-sin-citas.png')}
            style={styles.imagenVacia}
          />
          <Text style={styles.mensajeVacio}>No tienes citas agendadas</Text>
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
    paddingBottom: 100
  },
  cita: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(217, 34, 172, 0.50)',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    gap: 3
  },
  botones: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 13
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2
  },
  etiqueta: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#D922AC'
  },
  valor: {
    fontSize: 14,
    textAlign: 'right',
    color: '#3b3434'
  },
  fondoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modal: {
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
    marginBottom: 10,
  },
  mensajeModal: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
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
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#E42BB8',
  },
  textoBotonNo: {
    color: '#D922AC',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textoBotonSi: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  vacio: {
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
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#E42BB8'
  },
  areaSegura: {
    flex: 1,
    backgroundColor: '#FCE3EE'
  },
  acciones: {
    marginHorizontal: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 15,
    marginTop: 15,
    marginBottom: 15
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
  encabezado: {
    marginTop: 5
  },
  navegacion: {
    marginTop: 5,
    marginBottom: 3
  },
  nombreServicio: {
    fontSize: 20,
    fontWeight: '600',
    color: '#E42BB8',
    marginBottom: 3
  },
  filaConIcono: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  valorConIcono: {
    fontSize: 15,
    color: '#3b3434'
  }
});

export default PantallaCitas;
