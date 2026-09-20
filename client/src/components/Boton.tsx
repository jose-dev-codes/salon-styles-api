import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type BotonProps = {
  texto: string,
  onPress: () => void,
  flex?: number,
  borderRadius?: number
};

// Componente reutilizable para mostrar botones de la aplicación.
const Boton = ({ texto, onPress, flex, borderRadius = 18 }: BotonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.boton,
        {
          flex,
          borderRadius
        }
      ]}
      onPress={onPress}
    >
      <Text style={styles.textoBoton}>{texto}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#E42BB8',
    paddingVertical: 12,
    paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  }
});

export default Boton;
