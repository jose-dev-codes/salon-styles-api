import { Alert, Button, StyleSheet, ScrollView, Text, View } from 'react-native';
import { cancelarCita, obtenerMisCitas } from '@/services/citaService';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';

type Cita = {
  id_cita: number;
  id_servicio: number;
  id_usuario: number;
  fecha: string;
  hora: string;
  especialista: string;
  estado: string;
};

const formatearFecha = (fecha: string) => {
  const fechaFormateada = new Date(fecha);

  return fechaFormateada.toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const formatearHora = (hora: string) => {
  return hora.slice(0, 5);
};

const CitasScreen = () => {
  const [citas, setCitas] = useState<Cita[]>([]);

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
      cargarCitas();
      return;
    }

    Alert.alert(
      'Error',
      resultado?.datos.error ?? 'No se pudo cancelar la cita'
    );
  };

  const mostrarConfirmacionCancelacion = (id: number) => {
    Alert.alert(
      'Cancelar cita',
      '¿Estás seguro de que deseas cancelar esta cita?',
      [
        {
          text: 'No',
          style: 'cancel'
        },
        {
          text: 'Sí, cancelar',
          onPress: () => confirmarCancelacion(id)
        }
      ]
    );
  };

  useEffect(() => {
    cargarCitas();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mis citas</Text>

      {citas.length === 0 ? (
        <Text>No tienes citas agendadas</Text>
      ) : (
        citas.map((cita) => (
          <View
            key={cita.id_cita}
            style={styles.cita}
          >
            <Text><Text style={styles.label}>Fecha:</Text> {formatearFecha(cita.fecha)}</Text>
            <Text><Text style={styles.label}>Hora:</Text> {formatearHora(cita.hora)}</Text>
            <Text><Text style={styles.label}>Especialista:</Text> {cita.especialista}</Text>
            <Text><Text style={styles.label}>Estado:</Text> {cita.estado}</Text>

            {cita.estado !== 'cancelada' && (
              <View style={styles.botones}>
                <Button
                  title='Actualizar'
                  onPress={() => router.push({
                    pathname: '/editar-cita',
                    params: {
                      id: cita.id_cita.toString(),
                      fecha: cita.fecha,
                      hora: cita.hora,
                      especialista: cita.especialista
                    }
                  })}
                />

                <Button
                  title='Cancelar cita'
                  onPress={() => mostrarConfirmacionCancelacion(cita.id_cita)}
                />
              </View>
            )}
          </View>
        ))
      )}
    </ScrollView>
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
    textAlign: 'center'
  },
  cita: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 8
  },
  botones: {
    gap: 10,
    marginTop: 15
  },
  label: {
    fontWeight: 'bold'
  }
});

export default CitasScreen;
