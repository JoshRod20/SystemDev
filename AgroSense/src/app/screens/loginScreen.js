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
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { auth } from "../../app/services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const { width, height } = Dimensions.get("window");

// Correo del administrador
const ADMIN_EMAIL = "adminagrosense@.com";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const validateEmail = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = () => password.length >= 6;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setAttemptedSubmit(true);

    if (validateEmail() && validatePassword()) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Verificar si el email es del administrador
        if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
          navigation.navigate("AdminScreen");
        } else {
          navigation.navigate("AgroSense");
        }
      } catch (error) {
        let errorMessage = "Error al iniciar sesión";
        
        switch (error.code) {
          case "auth/user-not-found":
            errorMessage = "No existe una cuenta con este correo electrónico";
            break;
          case "auth/wrong-password":
            errorMessage = "Contraseña incorrecta";
            break;
          case "auth/invalid-email":
            errorMessage = "Correo electrónico inválido";
            break;
          default:
            errorMessage = "Error al iniciar sesión. Por favor, intente nuevamente";
        }
        
        Alert.alert("Error", errorMessage);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient colors={["#4A6B3E", "#fff"]} style={styles.container}>
        <Text style={styles.title}>Iniciar sesión</Text>

        <View style={styles.inputContainer}>
          <Image
            source={require("../../app/assets/icons8-logo-de-google-48.png")}
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

        <View style={styles.inputContainer}>
          <Image
            source={require("../../app/assets/password-svgrepo-com.png")}
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
              source={require("../../app/assets/eye-svgrepo-com.png")}
              style={styles.eyeIconImage}
            />
          </TouchableOpacity>
        </View>
        {attemptedSubmit && !validatePassword() && (
          <Text style={styles.errorText}>
            La contraseña debe tener al menos 6 caracteres
          </Text>
        )}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Iniciar</Text>
        </TouchableOpacity>

        <Text style={styles.registerLinkText}>¿Aún no tienes una cuenta?</Text>
        <Text
          style={styles.registerLink}
          onPress={() => navigation.navigate("Register")}
        >
          ¡Regístrate aquí!
        </Text>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: width * 0.11,
    fontWeight: "bold",
    marginBottom: height * 0.03,
    textAlign: "center",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    height: height * 0.06,
    paddingHorizontal: width * 0.03,
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 18,
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
  loginButton: {
    backgroundColor: "#4A6B3E",
    borderRadius: 18,
    paddingVertical: height * 0.02,
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.06,
    width: "85%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  loginButtonText: {
    color: "#FFF",
    fontSize: width * 0.05,
    fontWeight: "bold",
    height: height * 0.06,
    width: "85%",
    textAlign: "center",
    paddingTop: 10,
  },
  registerLinkText: {
    color: "#000000",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: height * 0.03,
    fontSize: width * 0.045,
  },
  registerLink: {
    color: "#4A6B3E",
    textAlign: "center",
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginTop: height * 0.01,
  },
});

export default LoginScreen;