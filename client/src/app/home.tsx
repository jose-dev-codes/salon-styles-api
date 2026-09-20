import { BackHandler, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Boton from '@/components/Boton';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {

  // Elimina el token almacenado y vuelve a la pantalla de inicio.
  const cerrarSesion = async () => {
    await AsyncStorage.removeItem('token');
    router.dismissAll();
    router.replace('/');
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => true;

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => subscription.remove();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header titulo='Inicio'/>

      <View style={styles.contenido}>

        <Boton
          texto='Ver mis citas'
          onPress={() => router.push('/citas')}
        />

        <Boton
          texto='Nueva cita'
          onPress={() => router.push('/crear-cita')}
        />

        <Boton
          texto='Cerrar sesión'
          onPress={cerrarSesion}
        />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCE3EE'
  },
  contenido: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    gap: 15
  }
});

export default HomeScreen;
