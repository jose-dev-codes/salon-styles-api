import { BackHandler, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { useCallback, useState } from 'react';
import Encabezado from '@/components/Encabezado';
import { SafeAreaView } from 'react-native-safe-area-context';
import BarraNavegacion from '@/components/BarraNavegacion';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {

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

  const cerrarSesion = async () => {
    await AsyncStorage.removeItem('token');
    router.dismissAll();
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Encabezado titulo='Inicio'/>

      <View style={styles.contenido}>
        <TouchableOpacity
          style={styles.botonCerrar}
          onPress={cerrarSesion}
        >
          <Text style={styles.textoCerrar}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

      <BarraNavegacion />
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
    padding: 20
  },
  botonCerrar: {
    backgroundColor: '#E42BB8',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignSelf: 'center'
  },
  textoCerrar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default HomeScreen;
