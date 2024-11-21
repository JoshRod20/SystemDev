import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Text, StyleSheet } from "react-native";

// Importar las pantallas
import WelcomeScreen from "../screens/welcomeScreen";
import RegisterScreen from "../screens/registerScreen";
import LoginScreen from "../screens/loginScreen";
import MainScreen from "../screens/mainScreen";
import AdminScreen from "../screens/AdminDashboard"; // Importamos AdminScreen
import ChatbotScreen from "../screens/chatbotScreen";
import FertilizerCalculator from "../screens/fertilizerCalculator";
import PestsDiseases from "../screens/pestsDiseases";
import CropAdvice from "../screens/cropAdvice";
import PestAlerts from "../screens/pestsAlerts";
import CultivoDetailScreen from "../screens/CultivoDetailScreen";
import theirCrops from "../screens/theirCrops";
import agriculturalLibrary from "../screens/agriculturalLibrary";
import NoticiasIPSA from "../screens/Noticiascomunidad";
import MapaAlertasCercanas from "../screens/MapaAlerta";

const Stack = createStackNavigator();

const AppNavigator = ({ user }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            {/* Pantalla de Administrador */}
            <Stack.Screen
              name="AdminScreen"
              component={AdminScreen}
              options={{
                headerTitle: () => (
                  <Text style={styles.headerTitle}>Panel de Administrador</Text>
                ),
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "center",
              }}
            />

            <Stack.Screen
              name="MainScreen"
              component={MainScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="FertilizerCalculator"
              component={FertilizerCalculator}
              options={{
                headerTitle: () => (
                  <Text style={styles.headerTitle}>Calculadora de Insumos</Text>
                ),
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "row",
              }}
            />

            <Stack.Screen
              name="PestsDiseases"
              component={PestsDiseases}
              options={{
                headerTitle: () => (
                  <Text style={styles.headerTitle}>Plagas y enfermedades</Text>
                ),
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "row",
              }}
            />

            <Stack.Screen
              name="CropAdvice"
              component={CropAdvice}
              options={{
                headerTitle: () => (
                  <Text style={styles.headerTitle}>Consejo de cultivos</Text>
                ),
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "row",
              }}
            />

            <Stack.Screen
              name="PestAlerts"
              component={PestAlerts}
              options={{
                headerTitle: () => (
                  <Text style={styles.headerTitle}>Alertas de plagas</Text>
                ),
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "row",
              }}
            />
            
            <Stack.Screen
              name="theirCrops"
              component={theirCrops}
              options={{
                headerTitle: () => (
                  <Text style={styles.headerTitle}>Sus cultivos</Text>
                ),
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "row",
              }}
            />

            <Stack.Screen
              name="CultivoDetailScreen"
              component={CultivoDetailScreen}
              options={{
                headerTitle: () => (
                  <Text style={styles.headerTitle}>Sus cultivos</Text>
                ),
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "row",
              }}
            />

            <Stack.Screen
              name="agriculturalLibrary"
              component={agriculturalLibrary}
              options={{
                headerTitle: () => (
                  <Text style={styles.headerTitle}>AgroBiblio</Text>
                ),
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "row",
              }}
            />

            <Stack.Screen
              name="NoticiasIPSA"
              component={NoticiasIPSA}
              options={{
                headerTitle: () => (
                  <Text style={styles.headerTitle}>Noticias de la comunidad</Text>
                ),
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "row",
              }}
            />

            <Stack.Screen
              name="MapaAlertasCercanas"
              component={MapaAlertasCercanas}
              options={{
                headerTitle: () => (
                  <Text style={styles.headerTitle}>Mapa de Alertas Cercanas</Text>
                ),
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "row",
              }}
            />

            <Stack.Screen
              name="ChatBot"
              component={ChatbotScreen}
              options={{
                headerTitle: () => (
                  <Text style={styles.headerTitle}>ChatBot AgroSense</Text>
                ),
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#000000",
                headerTitleAlign: "row",
              }}
            />
          </>
        ) : (
          <>
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