import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image, Alert, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from "../../app/services/firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";

// Obtener dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    // Validación de campos vacíos
    setEmailError(!email);
    setPasswordError(!password);

    if (!email || !password) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    try {
      // Iniciar sesión con Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('AgroSense'); // Cambiado de 'Home' a 'AgroSense'
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      Alert.alert('Error', 'No se pudo iniciar sesión. Verifique sus credenciales.');
    }
  };

  return (
    <LinearGradient
      colors={['#4A6B3E', '#fff']}
      style={styles.container}
    >
      <Text style={styles.title}>Iniciar sesión</Text>

      {/* Campo Correo */}
      <View style={[styles.inputContainer, emailError && styles.inputError]}>
        <Image source={require('../../app/assets/icons8-logo-de-google-48.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="rgba(255, 255, 255, 0.6)" // Placeholder blanco semitransparente
        />
      </View>

      {/* Campo Contraseña */}
      <View style={[styles.inputContainer, passwordError && styles.inputError]}>
        <Image source={require('../../app/assets/icons8-contraseña-50.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor="rgba(255, 255, 255, 0.6)" // Placeholder blanco semitransparente
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Image source={require('../../app/assets/icons8-visible-48.png')} style={styles.eyeIconImage} />
        </TouchableOpacity>
      </View>

      {/* Botón de Iniciar */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>

      {/* Enlace para registrar */}
      <Text style={styles.registerLinkText}>
        ¿Aún no tienes una cuenta?
      </Text>
      <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
        ¡Registrate aquí!
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: width * 0.05,
  },
  title: {
    fontSize: width * 0.11,
    fontWeight: "bold",
    marginBottom: height * 0.05,
    color: "#022D04",
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    height: height * 0.07,
    paddingHorizontal: width * 0.03,
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 20,
    marginBottom: height * 0.02,
    backgroundColor: "transparent", // Fondo transparente
  },
  inputError: {
    borderColor: "red",
  },
  icon: {
    width: width * 0.06,
    height: width * 0.06,
    marginRight: width * 0.03,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: width * 0.040,
    paddingLeft: 10,
    color: "white", // Texto en blanco
  },
  button: {
    width: "85%",
    height: height * 0.055,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4A6B3E",
    borderRadius: 15,
    marginTop: height * 0.02,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
  eyeIconImage: {
    width: width * 0.06,
    height: width * 0.06,
  },
  registerLinkText: {
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: height * 0.03,
    fontSize: width * 0.045,
  },
  registerLink: {
    color: '#4A6B3E',
    textAlign: 'center',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginTop: height * 0.01,
  },
});
