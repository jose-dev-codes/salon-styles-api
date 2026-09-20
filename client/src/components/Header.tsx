import { StyleSheet, Text, View } from 'react-native';

const Header = ({titulo}: {titulo: string}) => {
  return (
    <View style={styles.containerHeader}>
    <View style={styles.header}>
      <Text style={styles.tituloHeader}>{titulo}</Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    padding: 20,
    paddingTop: 5,
    paddingBottom: 0,
    alignItems: 'center',
    backgroundColor: '#FCE3EE'
  },
  header: {
    width: '100%',
    backgroundColor: '#E42BB8',
    paddingVertical: 10,
    alignItems: 'center',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  tituloHeader: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold'
  }
});

export default Header;
