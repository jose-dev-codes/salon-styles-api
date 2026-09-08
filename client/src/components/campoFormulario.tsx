import { StyleSheet, Text, TextInput } from 'react-native';

type CampoFormularioProps = {
  label: string,
  value: string,
  onChangeText: (texto: string) => void,
  placeholder?: string,
  secureTextEntry?: boolean,
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
};

const CampoFormulario = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences'
}: CampoFormularioProps) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D922AC'
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#D922AC',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15
  }
});

export default CampoFormulario;