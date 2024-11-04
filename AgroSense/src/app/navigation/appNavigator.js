<<<<<<< HEAD

=======
>>>>>>> 5f07213db87065d03ed6ab0080fea26a52ea9eb0
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Text, StyleSheet } from "react-native";

// Importar las pantallas
import WelcomeScreen from "../screens/welcomeScreen"; // Pantalla de bienvenida
import RegisterScreen from "../screens/registerScreen"; // Pantalla de registro
import LoginScreen from "../screens/loginScreen"; // Pantalla de login
import MainScreen from "../screens/mainScreen"; // Pantalla principal
import ChatbotScreen from "../screens/chatbotScreen"; // Pantalla de Chatbot
import FertilizerCalculator from "../screens/fertilizerCalculator"; // Pantalla Calculadora de fertilizantes
import PestsDiseases from "../screens/pestsDiseases"; // Pantalla Plagas y enfermedades
import CropAdvice from "../screens/cropAdvice"; // Pantalla Consejo de cultivo
import PestAlerts from "../screens/pestsAlerts"; // Pantalla Alertas de plagas
import theirCrops from "../screens/theirCrops"; // Pantalla Sus cultivos
import agriculturalLibrary from "../screens/agriculturalLibrary"; // Pantalla Biblioteca agricola
import NoticiasIPSA from "../screens/Noticiascomunidad"; // Pantalla Noticias de la comunidad
import MapaAlertasCercanas from "../screens/MapaAlerta"; // Pantalla Mapa de Alertas Cercanas

const Stack = createStackNavigator();

const AppNavigator = ({ user }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            {/* Si el usuario está autenticado, mostrar la pantalla Main y Chatbot */}
            <Stack.Screen
              name="MainScreen"
              component={MainScreen}
              options={{ headerShown: false }}
            />

            {/* Calculadora de fertilizantes */}
            <Stack.Screen
              name="FertilizerCalculator"
              component={FertilizerCalculator}
              options={{
                headerTitle: () => (
                  <Text style={styles.headerTitle}>
<<<<<<< HEAD
                    Calculadora de Insumos
                  </Text>
                ),
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "row",
=======
                    Calculadora de fertilizantes
                  </Text>
                ),
                headerStyle: {
                  backgroundColor: "#BCEABB",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "center",
>>>>>>> 5f07213db87065d03ed6ab0080fea26a52ea9eb0
              }}
            />

            {/* Plagas y enfermedades */}
            <Stack.Screen
              name="PestsDiseases"
              component={PestsDiseases}
              options={{
                headerTitle: () => (
                  <Text style={styles.headerTitle}>Plagas y enfermedades</Text>
                ),
                headerStyle: {
<<<<<<< HEAD
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "row",
=======
                  backgroundColor: "#BCEABB",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "center",
>>>>>>> 5f07213db87065d03ed6ab0080fea26a52ea9eb0
              }}
            />

            {/* Consejo de cultivos */}
            <Stack.Screen
              name="CropAdvice"
              component={CropAdvice}
              options={{
                headerTitle: () => (
                  <Text style={styles.headerTitle}>Consejo de cultivos</Text>
                ),
                headerStyle: {
<<<<<<< HEAD
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "row",
=======
                  backgroundColor: "#BCEABB",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "center",
>>>>>>> 5f07213db87065d03ed6ab0080fea26a52ea9eb0
              }}
            />

            {/* Alertas de plagas */}
            <Stack.Screen
              name="PestAlerts"
              component={PestAlerts}
              options={{
                headerTitle: () => (
                  <Text style={styles.headerTitle}>Alertas de plagas</Text>
                ),
                headerStyle: {
<<<<<<< HEAD
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "row",
=======
                  backgroundColor: "#BCEABB",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "center",
>>>>>>> 5f07213db87065d03ed6ab0080fea26a52ea9eb0
              }}
            />

            {/* Sus cultivos */}
            <Stack.Screen
              name="theirCrops"
              component={theirCrops}
              options={{
                headerTitle: () => (
                  <Text style={styles.headerTitle}>Sus cultivos</Text>
                ),
                headerStyle: {
<<<<<<< HEAD
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "row",
=======
                  backgroundColor: "#BCEABB",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "center",
>>>>>>> 5f07213db87065d03ed6ab0080fea26a52ea9eb0
              }}
            />

            {/* Biblioteca agricola */}
            <Stack.Screen
              name="agriculturalLibrary"
              component={agriculturalLibrary}
              options={{
                headerTitle: () => (
                  <Text style={styles.headerTitle}>AgroBiblio</Text>
                ),
                headerStyle: {
<<<<<<< HEAD
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "rowr",
=======
                  backgroundColor: "#BCEABB",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "center",
>>>>>>> 5f07213db87065d03ed6ab0080fea26a52ea9eb0
              }}
            />

            {/* Noticias de la comunidad */}
            <Stack.Screen
              name="NoticiasIPSA"
              component={NoticiasIPSA}
              options={{
                headerTitle: () => (
                  <Text style={styles.headerTitle}>
                    Noticias de la comunidad
                  </Text>
                ),
                headerStyle: {
<<<<<<< HEAD
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "row",
=======
                  backgroundColor: "#BCEABB",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "center",
>>>>>>> 5f07213db87065d03ed6ab0080fea26a52ea9eb0
              }}
            />

            {/* Mapa de alertas cercanas */}
            <Stack.Screen
              name="MapaAlertasCercanas"
              component={MapaAlertasCercanas}
              options={{
                headerTitle: () => (
                  <Text style={styles.headerTitle}>
                    Mapa de Alertas Cercanas
                  </Text>
                ),
                headerStyle: {
<<<<<<< HEAD
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "row",
=======
                  backgroundColor: "#BCEABB",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "center",
>>>>>>> 5f07213db87065d03ed6ab0080fea26a52ea9eb0
              }}
            />

            {/* ChatBot */}
            <Stack.Screen
              name="ChatBot"
              component={ChatbotScreen}
              options={{
                headerTitle: () => (
                  <Text style={styles.headerTitle}>ChatBot AgroSense</Text>
                ),
                headerStyle: {
<<<<<<< HEAD
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "row",
=======
                  backgroundColor: "#BCEABB",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "center",
>>>>>>> 5f07213db87065d03ed6ab0080fea26a52ea9eb0
              }}
            />
          </>
        ) : (
          <>
            {/* Si no está autenticado, mostrar Welcome, Register y Login */}
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
});

export default AppNavigator;
