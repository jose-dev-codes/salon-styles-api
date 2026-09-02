import { Button, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {

  // Elimina el token almacenado y vuelve a la pantalla de inicio.
  const cerrarSesion = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cejas y uñas</Text>

      <Button
        title='Ver mis citas'
        onPress={() => router.push('/citas')}
      />

      <Button
        title='Nueva cita'
        onPress={() => router.push('/crear-cita')}
      />

      <Button
        title='Cerrar sesión'
        onPress={cerrarSesion}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default HomeScreen;
