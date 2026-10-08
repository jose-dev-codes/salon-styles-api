import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Encabezado from '@/components/Encabezado';
import Boton from '@/components/Boton';
import BarraNavegacion from '@/components/BarraNavegacion';

const PantallaPerfil = () => {
  const cerrarSesion = async () => {
    await AsyncStorage.removeItem('token');

    router.dismissAll();

    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.encabezado}>
        <Encabezado titulo='Mi perfil'/>
      </View>

      <View style={styles.contenido}>

        <Boton
          texto='Cerrar sesión'
          onPress={cerrarSesion}
        />
      </View>

      <View style={styles.navegacion}>
        <BarraNavegacion />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#FCE3EE'
  },
  encabezado: {
    marginTop: 5
  },
  contenido: {
    flex: 1,
    padding: 20
  },
  navegacion: {
    marginBottom: 5
  }
});

export default PantallaPerfil;
