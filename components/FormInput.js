import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Color, FontFamily } from '../GlobalStyles';

const FormInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  multiline,
  textAlignVertical,
  style,
  inputStyle
}) => {
  return (
    <View style={style}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
          inputStyle
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        textAlignVertical={textAlignVertical}
        selectionColor={Color.blue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontFamily: FontFamily.nunitoMedium,
    color: Color.textGray,
    marginBottom: 6,
    marginTop: 12
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: Color.dividerGray,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    fontFamily: FontFamily.nunitoRegular,
    backgroundColor: Color.colorWhite
  },
  multilineInput: {
    height: 100,
    paddingTop: 12
  }
});

export default FormInput;
