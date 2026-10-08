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
        style={[
          styles.entrada,
          rutaActual === '/home' && styles.entradaActiva
        ]}
        onPress={() => navegar('/home')}
      >
        <MaterialCommunityIcons
          name='home'
          size={26}
          color={rutaActual === '/home' ? '#FFFFFF' : '#E42BB8'}
        />

        <Text
          style={[
            styles.texto,
            {
              color: rutaActual === '/home'
                ? '#FFFFFF'
                : '#E42BB8'
            }
          ]}>Inicio
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.entrada}>
        <MaterialCommunityIcons
          name='creation'
          size={26}
          color={rutaActual === '/servicios' ? '#EA85CE' : '#E42BB8'}
        />
        <Text
          style={[
            styles.texto,
            {
              color: rutaActual === '/servicios'
                ? '#EA85CE'
                : '#E42BB8'
            }
          ]}>Servicios
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.entrada,
          rutaActual === '/citas' && styles.entradaActiva
        ]}
        onPress={() => navegar('/citas')}
      >
        <MaterialCommunityIcons
          name='calendar-month'
          size={26}
          color={rutaActual === '/citas' ? '#FFFFFF' : '#E42BB8'}
        />
        <Text
          style={[
            styles.texto,
            {
              color: rutaActual === '/citas'
                ? '#FFFFFF'
                : '#E42BB8'
            }
          ]}>Citas
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.entrada,
          rutaActual === '/perfil' && styles.entradaActiva
        ]}
        onPress={() => navegar('/perfil')}
      >
        <MaterialCommunityIcons
          name='account'
          size={26}
          color={rutaActual === '/perfil' ? '#FFFFFF' : '#E42BB8'}
        />

        <Text
          style={[
            styles.texto,
            {
              color: rutaActual === '/perfil'
                ? '#FFFFFF'
                : '#E42BB8'
            }
          ]}>Perfil
        </Text>
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
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    gap: 12,
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.08)'
  },
  entrada: {
    flex: 1,
    alignItems: 'center',
    gap: 1
  },
  texto: {
    fontSize: 13,
    lineHeight: 16,
    fontFamily: 'Poppins_500Medium'
  },
  entradaActiva: {
    backgroundColor: '#E42BB8',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 2
  }
});

export default BarraNavegacion;
