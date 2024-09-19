import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputField from '../components/inputField';
import Button from '../components/button';
import GoogleButton from '../components/googleButton';

const LoginScreen = ({ navigation }) => {
  // Estado para almacenar el correo y la contraseña
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estado para manejar errores
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Función que maneja el inicio de sesión
  const handleLogin = () => {
    // Reiniciar los errores antes de validar
    setEmailError(!email);
    setPasswordError(!password);

    // Si algún campo está vacío, no procedemos
    if (!email || !password) {
      return;
    }

    // Si los campos están correctos, se puede proceder con la autenticación
    console.log('Login exitoso');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

      {/* Campo para el correo electrónico */}
      <InputField 
        placeholder="Correo electrónico" 
        keyboardType="email-address" 
        value={email} 
        onChangeText={(text) => setEmail(text)} 
        error={emailError}
      />
      {emailError && <Text style={styles.errorText}>El correo electrónico es obligatorio</Text>}

      {/* Campo para la contraseña */}
      <InputField 
        placeholder="Contraseña" 
        secureTextEntry 
        value={password} 
        onChangeText={(text) => setPassword(text)} 
        error={passwordError}
      />
      {passwordError && <Text style={styles.errorText}>La contraseña es obligatoria</Text>}

      {/* Botón de Google Sign In */}
      <GoogleButton onPress={() => console.log('Google Sign In')} />

      {/* Botón para iniciar sesión */}
      <Button title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
};

// Estilos
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
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default LoginScreen;
