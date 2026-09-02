import {
  KeyboardAvoidingView,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  View
} from 'react-native';

import { crearCita } from '@/services/citaService';
import { useState } from 'react';
import { router } from 'expo-router';

const CrearCitaScreen = () => {
  const [idServicio, setIdServicio] = useState('');
  const [fechaCita, setFechaCita] = useState('');
  const [horaCita, setHoraCita] = useState('');
  const [especialistaCita, setEspecialistaCita] = useState('');
  const [error, setError] = useState('');

  // Envía los datos de la cita al backend y redirige a la lista si se crea correctamente.
  const guardarCita = async () => {
    setError('');

    try {
      const resultado = await crearCita(
        idServicio,
        fechaCita,
        horaCita,
        especialistaCita
      );

      if (resultado && !resultado.respuesta.ok) {
        setError(resultado.datos.error);
        return;
      }

      if (resultado?.respuesta.ok) {
        router.replace('/citas');
      }
    } catch (error) {
      console.error('Error al conectar con el sevidor');
      setError('No se pudo conectar con el servidor');
    }
  };


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Crear cita</Text>

        <Text style={styles.label}>ID del servicio</Text>
        <TextInput
          style={styles.input}
          value={idServicio}
          onChangeText={setIdServicio}
          placeholder='Número del servicio'
        />

        <Text style={styles.label}>Fecha</Text>
        <TextInput
          style={styles.input}
          value={fechaCita}
          onChangeText={setFechaCita}
          placeholder='AAAA-MM-DD'
        />

        <Text style={styles.label}>Hora</Text>
        <TextInput
          style={styles.input}
          value={horaCita}
          onChangeText={setHoraCita}
          placeholder='HH:MM'
        />

        <Text style={styles.label}>Especialista</Text>
        <TextInput
          style={styles.input}
          value={especialistaCita}
          onChangeText={setEspecialistaCita}
          placeholder='Nombre del especialista'
        />

        {error && (
          <Text style={styles.error}>{error}</Text>
        )}

        <Button
          title='Crear cita'
          onPress={guardarCita}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 100
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15
  },
  error: {
    marginBottom: 15,
    color: 'red'
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontWeight: 'bold'
  }
});

export default CrearCitaScreen;
