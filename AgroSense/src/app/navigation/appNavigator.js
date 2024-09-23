import React from "react"; 
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Text, StyleSheet } from "react-native";

// Importar las pantallas
import WelcomeScreen from "../screens/welcomeScreen";
import RegisterScreen from "../screens/registerScreen";
import LoginScreen from "../screens/loginScreen";
import MainScreen from "../screens/mainScreen";
import ChatbotScreen from "../screens/chatbotScreen"; // Importar la pantalla de Chatbot

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
