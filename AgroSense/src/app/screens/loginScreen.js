import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputField from '../components/inputField';
import Button from '../components/button';
import GoogleButton from '../components/googleButton'; // Asegúrate de que este componente también esté bien definido.

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <GoogleButton onPress={() => console.log('Google Sign In')} />
      <InputField placeholder="Correo electrónico" keyboardType="email-address" />
      <InputField placeholder="Contraseña" secureTextEntry />
      <Button title="Iniciar" onPress={() => console.log('Login')} />
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
});

export default LoginScreen;
