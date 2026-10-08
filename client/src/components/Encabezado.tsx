import { StyleSheet, Text, View } from 'react-native';

const Encabezado = ({titulo}: {titulo: string}) => {
  return (
    <View style={styles.encabezado}>
      <Text style={styles.tituloEncabezado}>{titulo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  encabezado: {
    height: 48,
    marginHorizontal: 20,
    alignSelf: 'stretch',
    backgroundColor: '#E42BB8',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },
  tituloEncabezado: {
    color: '#FFFFFF',
    fontSize: 21,
    fontFamily: 'Poppins_500Medium',
    lineHeight: 30
  }
});

export default Encabezado;
