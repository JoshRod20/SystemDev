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
import { auth, db } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, getDocs, query, where } from "firebase/firestore";

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
        // Verificar si el correo electrónico ya está registrado en Firestore
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Mostrar alerta si el correo ya está registrado
          Alert.alert(
            "Advertencia",
            "El correo electrónico ya está registrado.",
            [{ text: "OK" }]
          );
          return;
        }

        // Continuar con el registro si no existe el correo en Firestore
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name,
          phone,
          email,
        });

        navigation.navigate("AgroSense");
      } catch (error) {
        let errorMessage = "Ocurrió un error al registrar el usuario.";
        if (error.code === "auth/email-already-in-use") {
          errorMessage = "El correo electrónico ya está registrado.";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "El correo electrónico no es válido.";
        } else if (error.code === "auth/weak-password") {
          errorMessage = "La contraseña es muy débil.";
        }

        Alert.alert("Error en el registro", errorMessage, [{ text: "OK" }]);
      }
    } else {
      Alert.alert(
        "Advertencia",
        "Por favor, complete todos los campos correctamente.",
        [{ text: "OK" }]
      );
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
    marginRight: width * 0.02,
  },
  eyeIconImage: {
    width: width * 0.05,
    height: width * 0.05,
  },
  registerButton: {
    width: "85%",
    height: height * 0.06,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4A6B3E",
    borderRadius: 20,
    marginBottom: height * 0.03,
    marginTop: height * 0.01,
  },
  registerButtonText: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 8,
  },
});

export default RegisterScreen;
