import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type BotonProps = {
  texto: string,
  onPress: () => void,
  flex?: number,
  borderRadius?: number,
  variante?: 'principal' | 'secundario'
};

// Componente reutilizable para mostrar botones de la aplicación.
const Boton = ({
  texto,
  onPress,
  flex,
  borderRadius = 18,
  variante = 'principal'
}: BotonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.boton,
        {
          flex,
          borderRadius,
          backgroundColor:
            variante === 'principal' ? '#E42BB8' : 'transparent',
          borderWidth:
            variante === 'secundario' ? 1 : 0,
          borderColor:
            variante === 'secundario' ? '#E42BB8' : 'transparent',
          shadowOpacity: variante === 'principal' ? 0.2 : 0,
          elevation: variante === 'principal' ? 3 : 0
        }
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.textoBoton,
        {
          color: variante === 'principal' ? '#FFFFFF' : '#E42BB8'
        }
      ]}>{texto}</Text>
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
