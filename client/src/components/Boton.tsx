import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type BotonProps = {
  texto: string,
  onPress: () => void
};

// Componente reutilizable para mostrar botones de la aplicación.
const Boton = ({ texto, onPress }: BotonProps) => {
  return (
    <TouchableOpacity
      style={styles.boton}
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
    borderRadius: 8,
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
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default Boton;