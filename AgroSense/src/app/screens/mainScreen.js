import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FeatureButton from '../components/featureButton'; 
import FooterMenu from '../components/footerMenu'; 

const Home = ({ navigation }) => {
  // Datos simulados para la tarjeta de clima
  const [weather, setWeather] = useState({
    temp: 23, 
    maxTemp: 27,
    minTemp: 23,
    description: 'Nublado',
    feelsLike: 31
  });

  return (
    <View style={styles.container}>
      {/* Encabezado con el nombre de la app */}
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
      <View style={styles.weatherCard}>
        <View style={styles.weatherLeft}>
          <Text style={styles.temp}>{weather.temp}°</Text>
          <Text style={styles.weatherText}>máxima: {weather.maxTemp}° mínima: {weather.minTemp}°</Text>
        </View>
        <View style={styles.weatherRight}>
          <Image source={require('../../app/assets/cloudy.png')} style={styles.weatherIcon} />
          <Text style={styles.descriptionText}>{weather.description}</Text>
          <Text style={styles.feelsLikeText}>sensación térmica {weather.feelsLike}°</Text>
        </View>
      </View>

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
    marginTop:10,
    padding: 15,
    backgroundColor: '#fff',
  },
  appName: {
    fontSize: 28,
    marginTop:10,
    marginLeft:52,
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
    marginTop:15,
    width: 35,
    height: 30,
  },
  bellIcon: {
    marginTop:15,
    width: 35,
    height: 30,
    marginRight: 15,
  },
  userIcon: {
    marginTop:15,
    width: 35,
    height: 30,
  },
  weatherCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#BCEABB',
    height:200,
    marginTop:60,
    padding: 30,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    
    elevation: 14,
  },
  weatherLeft: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  temp: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#333',
  },
  weatherText: {
    fontSize: 13,
    color: '#333',
  },
  weatherRight: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginBottom: 0,
  },
  descriptionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  feelsLikeText: {
    fontSize: 13,
    color: '#666',
  },
  featureContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop:30,
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
