import React from "react"; 
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Text, StyleSheet } from "react-native";

// Importar las pantallas
import WelcomeScreen from "../screens/welcomeScreen";
import RegisterScreen from "../screens/registerScreen";
import LoginScreen from "../screens/loginScreen"; //Importar la pantalla de login
import MainScreen from "../screens/mainScreen"; //Importar la pantalla principal
import ChatbotScreen from "../screens/chatbotScreen"; // Importar la pantalla de Chatbot
import FertilizerCalculator from "../screens/fertilizerCalculator"; // Importar la pantalla Calculadora de fertilizantes
import PestsDiseases from "../screens/pestsDiseases"; //Importar la pantalla Plagas y enfermedades
import CropAdvice from "../screens/cropAdvice"; //Importar la pantalla Consejo de cultivo
import PestAlerts from "../screens/pestsAlerts"; //Importar la pantalla Alertas de plagas
import theirCrops from "../screens/theirCrops"; //Importat la pantalla Sus cultivos
import agriculturalLibrary from "../screens/agriculturalLibrary"; //Importar la pantalla Biblioteca agricola

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
            <Stack.Screen
              name="FertilizerCalculator"
              component={FertilizerCalculator} // Pantalla Calculadora de Fertilizantes
              options={{
                headerTitle: () => (
                  <Text style={styles.headerTitle}>Calculadora de fertilizantes</Text>
                ),
                headerStyle: {
                  backgroundColor: '#BCEABB', // Color de fondo
                },
                headerTintColor: '#000000', // Color del texto del encabezado
                headerTitleAlign: 'center', // Alinear el título al centro
              }}
            />
            <Stack.Screen
              name="PestsDiseases"
              component={PestsDiseases} // Pantalla Plagas y enfermedades
              options={{
                headerTitle: () => (
                  <Text style={styles.headerTitle}>Plagas y enfermedades</Text>
                ),
                headerStyle: {
                  backgroundColor: '#BCEABB', // Color de fondo
                },
                headerTintColor: '#000000', // Color del texto del encabezado
                headerTitleAlign: 'center', // Alinear el título al centro
              }}
            />
            <Stack.Screen
              name="CropAdvice"
              component={CropAdvice} // Pantalla Consejo de cultivos
              options={{
                headerTitle: () => (
                  <Text style={styles.headerTitle}>Consejo de cultivos</Text>
                ),
                headerStyle: {
                  backgroundColor: '#BCEABB', // Color de fondo
                },
                headerTintColor: '#000000', // Color del texto del encabezado
                headerTitleAlign: 'center', // Alinear el título al centro
              }}
            />
            <Stack.Screen
              name="PestAlerts"
              component={PestAlerts} // Pantalla Alertas de plagas
              options={{
                headerTitle: () => (
                  <Text style={styles.headerTitle}>Alertas de plagas</Text>
                ),
                headerStyle: {
                  backgroundColor: '#BCEABB', // Color de fondo
                },
                headerTintColor: '#000000', // Color del texto del encabezado
                headerTitleAlign: 'center', // Alinear el título al centro
              }}
            />
            <Stack.Screen
              name="ChatBot"
              component={ChatbotScreen} // Pantalla de Chatbot
              options={{
                headerTitle: () => (
                  <Text style={styles.headerTitle}>ChatBot AgroSense</Text>
                ),
                headerStyle: {
                  backgroundColor: '#BCEABB', // Color de fondo
                },
                headerTintColor: '#000000', // Color del texto del encabezado
                headerTitleAlign: 'center', // Alinear el título al centro
              }}
            />
            <Stack.Screen
              name="theirCrops"
              component={theirCrops} // Pantalla de Chatbot
              options={{
                headerTitle: () => (
                  <Text style={styles.headerTitle}>Sus cultivos</Text>
                ),
                headerStyle: {
                  backgroundColor: '#BCEABB', // Color de fondo
                },
                headerTintColor: '#000000', // Color del texto del encabezado
                headerTitleAlign: 'center', // Alinear el título al centro
              }}
            />
            <Stack.Screen
              name="agriculturalLibrary"
              component={agriculturalLibrary} // Pantalla de Chatbot
              options={{
                headerTitle: () => (
                  <Text style={styles.headerTitle}>Biblioteca agricola</Text>
                ),
                headerStyle: {
                  backgroundColor: '#BCEABB', // Color de fondo
                },
                headerTintColor: '#000000', // Color del texto del encabezado
                headerTitleAlign: 'center', // Alinear el título al centro
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
    fontWeight: 'bold', // Negrita
    color: '#000000', // Color blanco para el texto
  },
});

export default AppNavigator;
