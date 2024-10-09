import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import InputField from '../components/inputField'; 
import Button from '../components/button';

// Obtener las dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

const RegisterScreen = ({ navigation }) => {
  // Estado para los campos del registro
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Estados para manejar errores
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  // Función para manejar el registro
  const handleRegister = () => {
    // Reiniciar los errores
    setNameError(!name);
    setPhoneError(!phone);
    setEmailError(!email);
    setPasswordError(!password);
    setConfirmPasswordError(password !== confirmPassword);

    // Verificar si todo está bien
    if (!name || !phone || !email || !password || password !== confirmPassword) {
      return;
    }

    // Si todo está correcto, simula un registro exitoso
    navigation.navigate('Login');  // Redirige al login después del registro
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      
      {/* Campo de Nombre */}
      <View style={styles.inputGroup}>
        <View style={styles.icon}>
          <Image source={require('../assets/icons8-usuario-48.png')} style={styles.iconImage} />
        </View>
        <InputField 
          placeholder="Nombre" 
          value={name} 
          onChangeText={setName} 
          error={nameError} 
        />
        {nameError && <Text style={styles.errorText}>El nombre es obligatorio</Text>}
      </View>

      {/* Campo de Teléfono */}
      <InputField 
        placeholder="Número de teléfono" 
        keyboardType="phone-pad" 
        value={phone} 
        onChangeText={setPhone} 
        error={phoneError} 
      />
      {phoneError && <Text style={styles.errorText}>El teléfono es obligatorio</Text>}

      {/* Campo de Correo Electrónico */}
      <InputField 
        placeholder="Correo electrónico" 
        keyboardType="email-address" 
        value={email} 
        onChangeText={setEmail} 
        error={emailError} 
      />
      {emailError && <Text style={styles.errorText}>El correo electrónico es obligatorio</Text>}

      {/* Campo de Contraseña */}
      <InputField 
        placeholder="Contraseña" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
        error={passwordError} 
      />
      {passwordError && <Text style={styles.errorText}>La contraseña es obligatoria</Text>}

      {/* Campo de Confirmar Contraseña */}
      <InputField 
        placeholder="Confirmar contraseña" 
        secureTextEntry 
        value={confirmPassword} 
        onChangeText={setConfirmPassword} 
        error={confirmPasswordError} 
      />
      {confirmPasswordError && <Text style={styles.errorText}>Las contraseñas no coinciden</Text>}
      
      {/* Botón de Registro */}
      <Button title="Registrarse" onPress={handleRegister} />

      {/* Enlace para iniciar sesión */}
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        ¿Ya tienes una cuenta? Iniciar sesión
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05, // Ajuste de padding basado en el ancho de la pantalla
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: width * 0.07, // Ajuste de tamaño de fuente basado en el ancho de la pantalla
    fontWeight: 'bold',
    marginTop: height * 0.03, // Ajuste de márgenes basado en la altura de la pantalla
    marginBottom: height * 0.03,
    textAlign: 'center',
    color: '#4F7C44',
  },
  link: {
    color: '#4F7C44',
    textAlign: 'center',
    marginTop: height * 0.02,
    fontSize: width * 0.045, // Ajuste de tamaño de fuente basado en el ancho de la pantalla
  },
  errorText: {
    color: 'red',
    marginTop: height * 0.01,
  },
  inputGroup: {
    marginBottom: height * 0.02, // Ajuste de espacio entre inputs basado en la altura de la pantalla
  },
  icon: {
    alignItems: 'center',
  },
  iconImage: {
    width: width * 0.1, // Ajuste de tamaño del ícono basado en el ancho de la pantalla
    height: width * 0.1,
  },
});

export default RegisterScreen;
