import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FeatureButton from '../components/featureButton'; // Asegúrate que esta ruta sea correcta
import FooterMenu from '../components/footerMenu'; // Asegúrate que esta ruta sea correcta
import WeatherCard from '../components/weatherCard'; // Asegúrate que esta ruta sea correcta
import { fetchWeatherData } from '../services/wheatherServices'; // Corrige la ruta si es necesario

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
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={require('../../app/assets/menú-48.png')} style={styles.hamburgerIcon} />
        </TouchableOpacity>
        <Text style={styles.appName}>AgroSense</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <Image source={require('../../app/assets/bell-48.png')} style={styles.bellIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
            <Image source={require('../../app/assets/perfilUser-48.png')} style={styles.userIcon} />
          </TouchableOpacity>
        </View>
      </View>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    padding: 15,
    backgroundColor: '#fff',
  },
  appName: {
    fontSize: 28,
    marginTop: 10,
    marginLeft: 52,
    fontWeight: 'bold',
    color: '#4A6B3E',
    textAlign: 'center',
    flex: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hamburgerIcon: {
    marginTop: 15,
    width: 35,
    height: 30,
  },
  bellIcon: {
    marginTop: 15,
    width: 35,
    height: 30,
    marginRight: 15,
  },
  userIcon: {
    marginTop: 15,
    width: 35,
    height: 30,
  },
  featureContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
    shadowColor: "#000",
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
});

export default Home;
