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
  error?: string
};

const CampoFormulario = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  icono,
  error
}: CampoFormularioProps) => {
  return (
    <>
      <Text style={styles.etiqueta}>{label}</Text>

      <View style={[
        styles.contenedorInput,
        error ? styles.contenedorInputError : null
      ]}>
        {icono && (
          <MaterialCommunityIcons
            name={icono}
            size={24}
            color={error ? '#D63031' : '#D922AC'}
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

      {error ? <Text style={styles.mensajeError}>{error}</Text> : null}
    </>
  );
};

const styles = StyleSheet.create({
  etiqueta: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: 18,
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
  contenedorInputError: {
    borderColor: '#D63031',
    marginBottom: 4
  },
  campoTexto: {
    flex: 1,
    paddingVertical: 7,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  mensajeError: {
    alignSelf: 'flex-start',
    marginBottom: 11,
    fontSize: 14,
    lineHeight: 18,
    color: '#D63031',
    fontFamily: 'Poppins_500Medium'
  }
});

export default CampoFormulario;
