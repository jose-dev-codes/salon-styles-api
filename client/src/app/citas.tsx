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
import ModalExito from '@/components/ModalExito';
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    month: 'long',
    year: 'numeric'
  });
};

const CitasScreen = () => {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState<number | null>(null);
  const [mostrarExito, setMostrarExito] = useState(false);

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
      resultado?.datos.error ?? 'No se pudo cancelar la cita'
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
    <SafeAreaView style={styles.safeArea}>
      <Header titulo='Mis citas' />

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
        mensaje='Cita cancelada correctamente'
        onClose={() => {
          setMostrarExito(false);
          cargarCitas();
        }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
      >

        {citas.length === 0 ? (
          <View style={styles.vacio}>
            <Image
              source={require('@/assets/images/avatar-sin-citas.png')}
              style={styles.imagenVacia} />
            <Text style={styles.mensajeVacio}>No tienes citas agendadas</Text>
          </View>
        ) : (
          citas.map((cita) => (
            <View
              key={cita.id_cita}
              style={styles.cita}
            >
              <View style={styles.fila}>
                <Text style={styles.label}>Servicio:</Text>
                <Text style={styles.valor}>{cita.servicio}</Text>
              </View>

              <View style={styles.fila}>
                <Text style={styles.label}>Precio:</Text>
                <Text style={styles.valor}>{formatearPrecio(cita.precio)}</Text>
              </View>

              <View style={styles.fila}>
                <Text style={styles.label}>Fecha:</Text>
                <Text style={styles.valor}>{formatearFecha(cita.fecha)}</Text>
              </View>

              <View style={styles.fila}>
                <Text style={styles.label}>Hora:</Text>
                <Text style={styles.valor}>{formatearHora(cita.hora)}</Text>
              </View>

              <View style={styles.fila}>
                <Text style={styles.label}>Especialista:</Text>
                <Text style={styles.valor}>{cita.especialista}</Text>
              </View>

              <View style={styles.fila}>
                <Text style={styles.label}>Estado:</Text>
                <Text style={styles.valor}>{cita.estado}</Text>
              </View>

              {cita.estado !== 'cancelada' && (
                <View style={styles.botones}>
                  <Boton
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
                    borderRadius={12}
                  />

                  <Boton
                    texto='Cancelar'
                    onPress={() => mostrarConfirmacionCancelacion(cita.id_cita)}
                    flex={1}
                    borderRadius={12}
                  />

                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    paddingBottom: 100
  },
  cita: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#D922AC',
    borderRadius: 12,
    backgroundColor: '#FFFFFF'
  },
  botones: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 15
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D922AC'
  },
  valor: {
    fontSize: 14,
    textAlign: 'right'
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
  scrollView: {
    backgroundColor: '#FCE3EE'
  },
  vacio: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
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
  safeArea: {
    flex: 1,
    backgroundColor: '#FCE3EE'
  }
});

export default CitasScreen;
