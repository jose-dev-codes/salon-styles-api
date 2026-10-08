import { IconCircleCheck } from '@tabler/icons-react-native';
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

          <IconCircleCheck
            size={110}
            color="#E42BB8"
            strokeWidth={1.5}
            style={{ marginBottom: 5 }}
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
    width: '88%',
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center'
  },
  mensajeModal: {
    fontSize: 17,
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: 20,
    textAlign: 'center',
    color: '#E42BB8'
  }
});

export default ModalExito;
