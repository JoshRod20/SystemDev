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
import { auth, db } from "../services/firebase"; // Importa Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { showMessage } from "react-native-flash-message"; // Importa showMessage

// Obtener las dimensiones de la pantalla
const { width, height } = Dimensions.get("window");

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const handleRegister = async () => {
    setAttemptedSubmit(true);
  
    if (
      validateName() &&
      validatePhone() &&
      validateEmail() &&
      validatePassword() &&
      validateConfirmPassword()
    ) {
      try {
        console.log("Iniciando proceso de registro...");
        
        // Crear un usuario con Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      
        // Obtener el usuario registrado
        const user = userCredential.user;
        console.log("Usuario creado exitosamente:", user);
      
        // Guardar la información del usuario en Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name,
          phone,
          email,
        });
        
        console.log("Información guardada en Firestore");
      
        // Redirigir al usuario a la pantalla de inicio de sesión
        navigation.navigate("AgroSense");
      } catch (error) {
        console.error("Error en el registro:", error);
      
        // Mostrar notificación si el correo electrónico ya está registrado
        let errorMessage = "Ocurrió un error al registrar el usuario.";
        if (error.code === "auth/email-already-in-use") {
          errorMessage = "El correo electrónico ya está registrado.";
        }
      
        // Mostrar mensaje con react-native-flash-message
        showMessage({
          message: "Error en el registro",
          description: errorMessage,
          type: "danger",
          icon: "auto",
          duration: 3000,
        });
      }
    } else {
      console.log("Errores de validación:", {
        name: validateName(),
        phone: validatePhone(),
        email: validateEmail(),
        password: validatePassword(),
        confirmPassword: validateConfirmPassword(),
      });
    }
  };
  
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient colors={["#4A6B3E", "#fff"]} style={styles.container}>
        <Text style={styles.title}>Registrarse</Text>

        {/* Campo de Nombre */}
        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/profile-about-mobile-ui-svgrepo-com.png")}
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
            source={require("../assets/cellphone-svgrepo-com.png")}
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
            source={require("../assets/password-svgrepo-com.png")}
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
              source={require("../assets/eye-svgrepo-com.png")}
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
            source={require("../assets/password-svgrepo-com (1).png")}
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
              source={require("../assets/eye-svgrepo-com.png")}
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
    textAlign: "center",
  },
});

export default RegisterScreen;
