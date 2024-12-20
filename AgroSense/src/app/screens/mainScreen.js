import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import FeatureButton from "../components/featureButton";
import FooterMenu from "../components/footerMenu";
import WeatherCard from "../components/weatherCard";
import { fetchWeatherData } from "../services/wheatherServices";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { auth } from "../../app/services/firebase";
import { signOut } from "firebase/auth";
import GraficoReporteEnfermedades from "./GraficoReporteEnfermedades";
import Estadisticas from "./estadisticas";

const { width, height } = Dimensions.get("window");

// Componente Home (pantalla principal)
const Home = ({ navigation }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      const latitude = 12.1364; // Coordenadas de Managua
      const longitude = -86.2514;
      const weatherData = await fetchWeatherData(latitude, longitude);
      if (weatherData) {
        setWeather(weatherData);
      }
    };

    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      {weather ? (
        <WeatherCard weather={weather} />
      ) : (
        <Text>Cargando datos del clima...</Text>
      )}

      <View style={styles.featureContainer}>
        <View style={styles.featureRow}>
          <FeatureButton
            icon={require("../../app/assets/fertilizer.png")}
            label="Calculadora de Insumos"
            onPress={() => navigation.navigate("FertilizerCalculator")}
            style={styles.featureButton}
          />
        </View>
        <View style={styles.featureRow}>
          <FeatureButton
            icon={require("../../app/assets/alerts.png")}
            label="Alertas de plagas"
            onPress={() => navigation.navigate("PestAlerts")}
            style={styles.featureButton}
          />
        </View>
      </View>

      <FooterMenu navigation={navigation} />
    </View>
  );
};

// Componente Settings (Configuraciones)
const SettingsScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth); // Cerrar sesión en Firebase
      navigation.replace("Login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

// Configuración del Drawer
const Drawer = createDrawerNavigator();

function UserProfileDrawer() {
  const dataReporteEnfermedades = [
    { date: "2017-01-05", count: 8 },
    { date: "2017-01-19", count: 5 },
    { date: "2017-02-06", count: 2 },
    { date: "2017-02-20", count: 4 },
    { date: "2017-03-07", count: 1 },
    { date: "2017-03-21", count: 3 },
    { date: "2017-04-05", count: 6 },
    { date: "2017-04-19", count: 2 },
    { date: "2017-05-03", count: 4 },
    { date: "2017-05-17", count: 7 },
    { date: "2017-06-06", count: 9 },
    { date: "2017-06-20", count: 5 },
    { date: "2017-07-05", count: 3 },
    { date: "2017-07-19", count: 4 },
    { date: "2017-08-07", count: 2 },
    { date: "2017-08-21", count: 8 },
    { date: "2017-09-06", count: 3 },
    { date: "2017-09-20", count: 7 },
    { date: "2017-10-04", count: 5 },
    { date: "2017-10-18", count: 6 },
    { date: "2017-11-06", count: 2 },
    { date: "2017-11-20", count: 9 },
    { date: "2017-12-05", count: 4 },
    { date: "2017-12-19", count: 7 },
  ];

  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="AgroSense"
        component={Home}
        options={{
          drawerLabel: () => <Text style={styles.drawerLabel}>Inicio</Text>,
        }}
      />
      <Drawer.Screen
        name="Configuraciones"
        component={SettingsScreen}
        options={{
          drawerLabel: () => (
            <Text style={styles.drawerLabel}>Configuraciones</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Actividad de Plagas"
        options={{
          drawerLabel: () => (
            <Text style={styles.drawerLabel}>Reporte de plagas</Text>
          ),
        }}
      >
        {() => (
          <GraficoReporteEnfermedades dataReporteEnfermedades={dataReporteEnfermedades} />
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="Precios de Mercado"
        options={{
          drawerLabel: () => (
            <Text style={styles.drawerLabel}>Precios de Mercado</Text>
          ),
        }}
      >
        {() => <Estadisticas />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: width * 0.05, // Ajuste dinámico basado en el ancho de la pantalla
  },
  featureContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginTop: height * 0.03,
    marginBottom: height * 0.05,
  },
  featureRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: height * 0.02,
  },
  featureButton: {
    flex: 1,
    marginHorizontal: width * 0.02,
  },
  button: {
    marginTop: height * 0.02,
    padding: width * 0.03,
    backgroundColor: "#4A6B3E",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.045, // Tamaño de fuente dinámico basado en el ancho
  },
  drawerLabel: {
    fontSize: width * 0.045, // Tamaño de fuente dinámico basado en el ancho
    fontWeight: "bold",
    color: "#4A6B3E",
  },
});

export default UserProfileDrawer;
