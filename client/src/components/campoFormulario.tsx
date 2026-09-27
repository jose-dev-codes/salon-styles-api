import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type CampoFormularioProps = {
  label: string,
  value: string,
  onChangeText: (texto: string) => void,
  placeholder?: string,
  secureTextEntry?: boolean,
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  icono?: keyof typeof MaterialCommunityIcons.glyphMap;
};

const CampoFormulario = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  icono
}: CampoFormularioProps) => {
  return (
    <>
      <Text style={styles.etiqueta}>{label}</Text>

      <View style={styles.contenedorInput}>
        {icono && (
          <MaterialCommunityIcons
            name={icono}
            size={24}
            color='#D922AC'
          />
        )}

        <TextInput
          style={styles.campoTexto}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  etiqueta: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D922AC'
  },
  contenedorInput: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: '#D922AC',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15
  },
  campoTexto: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16
  }
});

export default CampoFormulario;
