import { BackHandler, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { obtenerProximaCita } from '@/services/citaService';
import { formatearFechaLarga, formatearHora12 } from '@/utils/formularioUtils';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { obtenerPerfil } from '@/services/usuarioService';
import { LinearGradient } from 'expo-linear-gradient';

import Encabezado from '@/components/Encabezado';
import BarraNavegacion from '@/components/BarraNavegacion';

import {
  IconCalendarTime,
  IconClock,
  IconMapPin,
  IconCalendarPlus
} from '@tabler/icons-react-native';

const PantallaPrincipal = () => {
  const [proximaCita, setProximaCita] = useState<any>(null);
  const [usuario, setUsuario] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      const cargarProximaCita = async () => {
        const resultado = await obtenerProximaCita();

        if (resultado) {
          setProximaCita(resultado.datos);
        }
      };

      const cargarPerfil = async () => {
        const resultado = await obtenerPerfil();

        if (resultado) {
          setUsuario(resultado.datos);
        }
      };

      cargarProximaCita();
      cargarPerfil();

      const onBackPress = () => true;

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => subscription.remove();
    }, [])
  );

  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.encabezado}>
        <Encabezado titulo='Inicio' />
      </View>

      <View style={styles.contenido}>
        <View style={styles.contenedorBienvenida}>
          <Text
            style={[
              styles.tituloBienvenida,
              { color: '#9F167C' }
            ]}>Hola
          </Text>

          <Text
            style={[
              styles.tituloBienvenida,
              { color: '#E42BB8' }
            ]}>{usuario?.nombres}!
          </Text>
        </View>

        <View style={styles.tarjetaEspecialidades}>
          <MaterialCommunityIcons
            name='hand-heart'
            size={40}
            color='#E42BB8'
          />

          <View style={styles.textoEspecialidades}>
            <Text style={styles.tituloEspecialidades}>
              Especialidades
            </Text>

            <Text style={styles.datoTarjeta}>
              Cejas · Uñas · Cuidado facial
            </Text>
          </View>
        </View>

        <Text style={styles.tituloSeccion}>
          Lo que necesitas
        </Text>

        <View style={styles.contenedorTarjetas}>
          <View style={styles.tarjeta}>
            <IconCalendarTime
              size={30}
              color="#E42BB8"
              strokeWidth={1.8}
            />

            <Text style={styles.tituloTarjeta}>Próxima cita</Text>

            {proximaCita ? (
              <>
                <Text style={styles.datoTarjeta}>
                  • {proximaCita.servicio}
                </Text>

                <Text style={styles.datoTarjeta}>
                  • {formatearFechaLarga(proximaCita.fecha)}
                </Text>

                <Text style={styles.datoTarjeta}>
                  • {formatearHora12(proximaCita.hora)}
                </Text>
              </>
            ) : (
              <Text style={styles.datoTarjeta}>No tienes citas próximas</Text>
            )}

          </View>

          <View style={styles.tarjetaAgendar}>
            <LinearGradient
              colors={['#FFFFFF', 'rgba(228, 43, 184, 0.20)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1.6 }}
              style={styles.degradadoAgendar}
            >
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => router.push('/crear-cita')}
              >
                <IconCalendarPlus
                  size={30}
                  color="#E42BB8"
                  strokeWidth={1.8}
                />

                <Text style={styles.tituloTarjeta}>
                  Agendar cita
                </Text>

                <Text style={styles.datoTarjeta}>
                  Reserva tu próxima cita
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <View style={styles.tarjeta}>
            <IconClock
              size={30}
              color="#E42BB8"
              strokeWidth={1.8}
            />

            <Text style={styles.tituloTarjeta}>
              Horario
            </Text>

            <Text style={styles.datoTarjeta}>
              Lunes a sábado
            </Text>

            <Text style={styles.datoTarjeta}>
              8:00 a.m. - 6:00 p.m.
            </Text>
          </View>

          <View style={styles.tarjeta}>
            <IconMapPin
              size={30}
              color="#E42BB8"
              strokeWidth={1.8}
            />

            <Text style={styles.tituloTarjeta}>
              Dirección
            </Text>

            <Text style={styles.datoTarjeta}>
              Carrera 14 # 10-25
            </Text>

            <Text style={styles.datoTarjeta}>
              Armenia, Quindío
            </Text>
          </View>
        </View>
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
  contenido: {
    flex: 1,
    padding: 20
  },
  encabezado: {
    marginTop: 5
  },
  contenedorBienvenida: {
    flexDirection: 'row',
    gap: 4
  },
  tituloBienvenida: {
    fontSize: 20,
    fontFamily: 'Poppins_500Medium',
    marginBottom: 10,
    lineHeight: 25
  },
  contenedorTarjetas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  tarjeta: {
    width: '48%',
    minHeight: 145.5,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.04)',
  },
  tituloTarjeta: {
    color: '#E42BB8',
    fontSize: 15,
    fontFamily: 'Poppins_500Medium',
    marginTop: 3,
    marginBottom: 5
  },
  datoTarjeta: {
    color: '#5F5359',
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 18
  },
  tarjetaEspecialidades: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(228, 43, 184, 0.10)',
    borderWidth: 1,
    borderColor: 'rgba(228, 43, 184, 0.10)',
    borderRadius: 16,
    padding: 14,
    marginBottom: 28,
    boxShadow: '0px 1px 2px 1px rgba(0, 0, 0, 0.04)',
    gap: 10
  },
  textoEspecialidades: {
    paddingHorizontal: 18,
    borderLeftWidth: 1,
    justifyContent: 'center',
    borderLeftColor: 'rgba(228, 43, 184, 0.50)',
  },
  tituloEspecialidades: {
    color: '#E42BB8',
    fontSize: 15,
    lineHeight: 18,
    fontFamily: 'Poppins_500Medium',
    marginBottom: 10,
  },
  tituloSeccion: {
    color: '#9F167C',
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
    marginBottom: 8
  },
  navegacion: {
    marginBottom: 5
  },
  tarjetaAgendar: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(217, 34, 172, 0.10)',
    padding: 3,
    marginBottom: 14,
    boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.04)',
    overflow: 'hidden'
  },
  degradadoAgendar: {
    flex: 1,
    borderRadius: 13,
    padding: 11
  }
});

export default PantallaPrincipal;
