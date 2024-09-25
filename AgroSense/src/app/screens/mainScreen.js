import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FeatureButton from '../components/featureButton';
import FooterMenu from '../components/footerMenu';
import WeatherCard from '../components/weatherCard';
import { fetchWeatherData } from '../services/wheatherServices';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { auth } from '../../app/services/firebase'; // Importar auth de Firebase
import { signOut } from 'firebase/auth'; // Importar signOut de Firebase

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
      {/* Tarjeta del clima */}
      {weather ? (
        <WeatherCard weather={weather} />
      ) : (
        <Text>Cargando datos del clima...</Text>
      )}

      {/* Botones de funcionalidades */}
      <View style={styles.featureContainer}>
        <View style={styles.featureRow}>
          <FeatureButton
            icon={require('../../app/assets/fertilizer.png')}
            label="Calculadora de fertilizante"
            onPress={() => navigation.navigate('FertilizerCalculator')}
            style={styles.featureButton}
          />
          <FeatureButton
            icon={require('../../app/assets/pest.png')}
            label="Plagas y enfermedades"
            onPress={() => navigation.navigate('PestsDiseases')}
            style={styles.featureButton}
          />
        </View>
        <View style={styles.featureRow}>
          <FeatureButton
            icon={require('../../app/assets/crops.png')}
            label="Consejo de cultivo"
            onPress={() => navigation.navigate('CropAdvice')}
            style={styles.featureButton}
          />
          <FeatureButton
            icon={require('../../app/assets/alerts.png')}
            label="Alertas de plagas"
            onPress={() => navigation.navigate('PestAlerts')}
            style={styles.featureButton}
          />
        </View>
      </View>

      {/* Menú inferior */}
      <FooterMenu navigation={navigation} />
    </View>
  );
};

// Componente para las configuraciones
const SettingsScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth); // Cerrar sesión en Firebase
      navigation.replace('Register'); // Navegar a la pantalla de Registro
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
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
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="AgroSense" // Cambiado a HomeScreen
        component={Home}
        options={{
          drawerLabel: () => <Text style={styles.drawerLabel}>Inicio</Text>,
        }}
      />
      <Drawer.Screen
        name="Configuraciones"
        component={SettingsScreen}
        options={{
          drawerLabel: () => <Text style={styles.drawerLabel}>Configuraciones</Text>,
        }}
      />
    </Drawer.Navigator>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  featureContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  featureButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  settingsText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4A6B3E',
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4A6B3E',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  drawerLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A6B3E',
  },
});

export default UserProfileDrawer;
