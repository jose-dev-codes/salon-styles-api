import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type MensajeErrorProps = {
  mensaje: string
};

const MensajeError = ({mensaje}: MensajeErrorProps) => {
  return (
    <View style={styles.error}>
      <MaterialCommunityIcons
        name='alert-outline'
        size={26}
        color='#D63031'
      />

      <Text style={styles.mensaje}>{mensaje}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D63031',
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(214, 48, 49, 0.12)',
    gap: 8
  },
  mensaje: {
    flexShrink: 1,
    fontSize: 15.5,
    color: '#D63031',
    fontWeight: '600'
  }
});

export default MensajeError;
