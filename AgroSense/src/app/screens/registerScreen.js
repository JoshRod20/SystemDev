import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputField from '../components/inputField';
import Button from '../components/button';
import GoogleButton from '../components/googleButton';

const RegisterScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      <InputField placeholder="Nombre" />
      <InputField placeholder="Número de teléfono" keyboardType="phone-pad" />
      <InputField placeholder="Correo electrónico" keyboardType="email-address" />
      <InputField placeholder="Contraseña" secureTextEntry />
      <InputField placeholder="Confirmar contraseña" secureTextEntry />
      <Button title="Iniciar" onPress={() => navigation.navigate('Login')} />
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        ¿Ya tienes una cuenta? Iniciar sesión
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4F7C44',
  },
  link: {
    color: '#4F7C44',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
  },
});

export default RegisterScreen;
