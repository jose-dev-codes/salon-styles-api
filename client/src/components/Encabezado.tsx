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
    marginHorizontal: 20,
    alignSelf: 'stretch',
    backgroundColor: '#E42BB8',
    paddingVertical: 10,
    alignItems: 'center',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  tituloEncabezado: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold'
  }
});

export default Encabezado;
