import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Obtener las dimensiones de la pantalla
const { width, height } = Dimensions.get("window");

const RegisterScreen = ({ navigation }) => {
  // Estado para los campos del registro
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Estado para manejar si el usuario ha intentado enviar el formulario
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  // Validaciones de los campos
  const validateName = () => name.length > 0;
  const validatePhone = () => /^\d+$/.test(phone);
  const validateEmail = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = () => password.length >= 6;
  const validateConfirmPassword = () => password === confirmPassword;

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Función para manejar el registro
  const handleRegister = () => {
    setAttemptedSubmit(true);

    // Verificar si todos los campos son válidos
    if (
      validateName() &&
      validatePhone() &&
      validateEmail() &&
      validatePassword() &&
      validateConfirmPassword()
    ) {
      // Si todo está correcto, simula un registro exitoso
      navigation.navigate("Login"); // Redirige al login después del registro
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/**LinearGradient para el degradado en la pantalla */}
      <LinearGradient colors={["#4A6B3E", "#fff"]} style={styles.container}>
        <Text style={styles.title}>Registrarse</Text>

        {/* Campo de Nombre */}
        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/icons8-usuario-48.png")}
            style={styles.iconImage}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#000"
          />
        </View>
        {attemptedSubmit && !validateName() && (
          <Text style={styles.errorText}>El nombre es obligatorio</Text>
        )}

        {/* Campo de Teléfono */}
        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/icons8-teléfono-50.png")}
            style={styles.iconImage}
          />
          <TextInput
            style={styles.input}
            placeholder="Número de teléfono"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholderTextColor="#000"
          />
        </View>
        {attemptedSubmit && !validatePhone() && (
          <Text style={styles.errorText}>
            El número de teléfono debe ser válido
          </Text>
        )}

        {/* Campo de Correo Electrónico */}
        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/icons8-logo-de-google-48.png")}
            style={styles.iconImage}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#000"
          />
        </View>
        {attemptedSubmit && !validateEmail() && (
          <Text style={styles.errorText}>
            El correo electrónico debe ser válido
          </Text>
        )}

        {/* Campo de Contraseña */}
        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/icons8-contraseña-50.png")}
            style={styles.iconImage}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#000"
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image
              source={require("../assets/icons8-visible-48.png")}
              style={styles.eyeIconImage}
            />
          </TouchableOpacity>
        </View>
        {attemptedSubmit && !validatePassword() && (
          <Text style={styles.errorText}>
            La contraseña debe tener al menos 6 caracteres
          </Text>
        )}

        {/* Campo de Confirmar Contraseña */}
        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/icons8-contraseña-50.png")}
            style={styles.iconImage}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#000"
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image
              source={require("../assets/icons8-visible-48.png")}
              style={styles.eyeIconImage}
            />
          </TouchableOpacity>
        </View>
        {attemptedSubmit && !validateConfirmPassword() && (
          <Text style={styles.errorText}>Las contraseñas no coinciden</Text>
        )}

        {/* Botón de Registro */}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Registrar</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    justifyContent: "center",
    alignItems: "center", // Alinea los elementos al centro horizontalmente
  },
  title: {
    fontSize: width * 0.11,
    fontWeight: "bold",
    marginBottom: height * 0.03,
    textAlign: "center",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.5)", // Color de la sombra
    textShadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    textShadowRadius: 4, // Radio de la sombra
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    height: height * 0.06,
    paddingHorizontal: width * 0.03,
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 20,
    marginBottom: height * 0.02,
    backgroundColor: "transparent",
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: width * 0.04,
    paddingLeft: 10,
    color: "white",
    textAlign: "center",
    paddingRight: 50,
  },
  iconImage: {
    width: width * 0.06,
    height: width * 0.06,
    marginRight: width * 0.03,
  },
  eyeIconImage: {
    width: width * 0.06,
    height: width * 0.06,
  },
  errorText: {
    color: "red",
    fontSize: width * 0.03,
    marginBottom: height * 0.02,
    textAlign: "center",
  },
  registerButton: {
    backgroundColor: "#4A6B3E",
    borderRadius: 25,
    paddingVertical: height * 0.02,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.02,
    width: "85%",
  },
  registerButtonText: {
    color: "#FFF",
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
});

export default RegisterScreen;