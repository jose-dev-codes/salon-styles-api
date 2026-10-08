import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type BotonTarjetaProps = {
  texto: string,
  onPress: () => void,
  flex?: number,
  variante?: 'principal' | 'peligro'
};

// Botón plano, sin sombra, para usar dentro de las tarjetas de citas.
const BotonTarjeta = ({
  texto,
  onPress,
  flex,
  variante = 'principal'
}: BotonTarjetaProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.boton,
        {
          flex,
          backgroundColor:
            variante === 'principal'
              ? 'rgba(255, 84, 212, 0.25)'
              : 'rgba(214, 48, 49, 0.25)',
          borderColor:
            variante === 'principal'
              ? 'rgba(228, 43, 184, 0.15)'
              : 'rgba(214, 48, 49, 0.15)'
        }
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.textoBoton,
        {
          color: variante === 'principal' ? '#E42BB8' : '#D63031'
        }
      ]}>{texto}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boton: {
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1
  },
  textoBoton: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    lineHeight: 21.5
  }
});

export default BotonTarjeta;
