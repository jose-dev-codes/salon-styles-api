import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';

import { router } from 'expo-router';
import { useState } from 'react';
import { validarLogin } from '@/validators/authValidator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { iniciarSesion } from '@/services/authService';

const LoginScreen = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const manejarInicioSesion = async () => {
    const mensajeError = validarLogin(correo, contrasena);

    if (mensajeError) {
      setError(mensajeError);
      return;
    }

    setError('');

    try {
      const { respuesta, datos } = await iniciarSesion(correo, contrasena);

      if (!respuesta.ok) {
        setError(datos.error);
        return;
      }

      await AsyncStorage.setItem('token', datos.token);
      router.replace('/home');

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
        <Text style={styles.title}>Iniciar sesión</Text>

        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder='ejemplo@correo.com'
          value={correo}
          onChangeText={setCorreo}
          keyboardType='email-address'
          autoCapitalize='none'
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder='Ingresa tu contraseña'
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <View style={styles.buttonContainer}>
          <Button
            title="Iniciar sesión"
            onPress={manejarInicioSesion}
          />

          <Button
            title="Volver al inicio"
            onPress={() => router.back()}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5
  },
  buttonContainer: {
    gap: 10
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

export default LoginScreen;
