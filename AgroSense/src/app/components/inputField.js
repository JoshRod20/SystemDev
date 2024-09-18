import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const InputField = ({ placeholder, keyboardType, secureTextEntry }) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    keyboardType={keyboardType}
    secureTextEntry={secureTextEntry}
  />
);

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#4F7C44',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

export default InputField;
