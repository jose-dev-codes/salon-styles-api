import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View
} from 'react-native';

type ModalExitoProps = {
  visible: boolean,
  mensaje: string,
  onClose: () => void
};

// Componente reutilizable para mostrar mensajes de éxito.
const ModalExito = ({
  visible,
  mensaje,
  onClose
}: ModalExitoProps) => {

  useEffect(() => {
    if (!visible) {
      return;
    }

    const temporizador = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(temporizador);
  }, [visible, onClose]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
    >
      <View style={styles.fondoModal}>
        <View style={styles.modal}>

          <MaterialCommunityIcons
            name='check-circle-outline'
            size={90}
            color='#E42BB8'
            style={{marginBottom: 10}}
          />

          <Text style={styles.mensajeModal}>{mensaje}</Text>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fondoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  modal: {
    width: '85%',
    padding: 25,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#D922AC',
    alignItems: 'center'
  },
  mensajeModal: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#E42BB8'
  }
});

export default ModalExito;
