import {
  KeyboardAvoidingView,
  Button,
  StyleSheet,
  Text,
  TextInput,
  ScrollView
} from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { actualizarCita } from '@/services/citaService';

const EditarCitaScreen = () => {
  const [fechaCita, setFechaCita] = useState('');
  const [horaCita, setHoraCita] = useState('');
  const [especialistaCita, setEspecialistaCita] = useState('');
  const [error, setError] = useState('');

  const { id, fecha, hora, especialista } = useLocalSearchParams();

  useEffect(() => {
    if (fecha) setFechaCita(fecha.toString());
    if (hora) setHoraCita(hora.toString());
    if (especialista) setEspecialistaCita(especialista.toString());
  }, [fecha, hora, especialista]);

  // Envía los cambios al backend y vuelve a la lista si la actualización es exitosa.
  const guardarCambios = async () => {
    setError('');

    try {
      const resultado = await actualizarCita(
        id.toString(),
        fechaCita,
        horaCita,
        especialistaCita
      );

      if (!resultado?.respuesta.ok) {
        setError(resultado?.datos.error);
        return;
      }

      router.replace('/citas');
    } catch (error) {
      console.error('Error al conectar con el servidor', error);
      setError('No se pudo conectar con el servidor');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='padding'
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Editar cita</Text>

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

        {error && (<Text style={styles.error}>{error}</Text>)}

        <Button
          title="Guardar cambios"
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
    textAlign: 'center'
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontWeight: 'bold'
  },
  error: {
    marginBottom: 15,
    color: 'red'
  }
});

export default EditarCitaScreen;
