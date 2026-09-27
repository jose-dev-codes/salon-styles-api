import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Href, router, usePathname } from 'expo-router';

const BarraNavegacion = () => {
  const rutaActual = usePathname();

  const navegar = (ruta: Href) => {
    if (rutaActual === ruta) {
      return;
    }

    router.navigate(ruta);
  };

  return (
    <View style={styles.contenedor}>
      <TouchableOpacity
        style={[styles.entrada, rutaActual === '/home' && styles.entradaActiva]}
        onPress={() => navegar('/home')}
      >
        <MaterialCommunityIcons
          name='home'
          size={26}
          color={rutaActual === '/home' ? '#FFFFFF' : '#E42BB8'} />
        <Text style={[styles.texto, {color: rutaActual === '/home' ? '#FFFFFF' : '#E42BB8'}]}>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.entrada}>
        <MaterialCommunityIcons
          name='creation'
          size={26}
          color={rutaActual === '/servicios' ? '#EA85CE' : '#E42BB8'} />
        <Text style={[styles.texto, {color: rutaActual === '/servicios' ? '#EA85CE' : '#E42BB8'}]}>Servicios</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.entrada, rutaActual === '/citas' && styles.entradaActiva]}
        onPress={() => navegar('/citas')}
      >
        <MaterialCommunityIcons
          name='calendar-month'
          size={26}
          color={rutaActual === '/citas' ? '#FFFFFF' : '#E42BB8'} />
        <Text style={[styles.texto, {color: rutaActual === '/citas' ? '#FFFFFF' : '#E42BB8'}]}>Citas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.entrada, rutaActual === '/perfil' && styles.entradaActiva]}>
        <MaterialCommunityIcons
          name='account'
          size={26}
          color={rutaActual === '/perfil' ? '#F0A3DA' : '#E42BB8'} />
        <Text style={[styles.texto, {color: rutaActual === '/perfil' ? '#F0A3DA' : '#E42BB8'}]}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    marginHorizontal: 20,
    alignSelf: 'stretch',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(228, 43, 184, 0.25)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    gap: 12
  },
  entrada: {
    flex: 1,
    alignItems: 'center',
    gap: 1
  },
  texto: {
    fontSize: 13,
    fontWeight: 'bold'
  },
  entradaActiva: {
    backgroundColor: '#E42BB8',
    borderRadius: 20,
    paddingVertical: 3
  }
});

export default BarraNavegacion;
