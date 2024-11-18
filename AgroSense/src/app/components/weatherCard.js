import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const WeatherCard = ({ weather }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.temperature}>{weather.main.temp}°C</Text>
      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }}
        style={styles.weatherIcon}
        testID="weather-icon" // Se agregó el testID para realizar las pruebas de caja negra
      />
      <Text style={styles.description}>{weather.weather[0].description}</Text>
      <Text style={styles.minMax}>
        Máx: {weather.main.temp_max}° Min: {weather.main.temp_min}°
      </Text>
      <Text style={styles.feelsLike}>Sensación térmica: {weather.main.feels_like}°C</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#B7D2BF',
    height: height * 0.3,
    width: width * 0.9,
    marginTop: height * 0.03,
    marginBottom: height * 0.02,
    padding: width * 0.05,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  temperature: {
    fontSize: width * 0.1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  weatherIcon: {
    width: width * 0.2,
    height: width * 0.2,
    marginVertical: 10,
  },
  description: {
    fontSize: width * 0.045,
    marginTop: 5,
    textAlign: 'center',
  },
  minMax: {
    fontSize: width * 0.04,
    marginTop: 5,
    textAlign: 'center',
  },
  feelsLike: {
    fontSize: width * 0.04,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default WeatherCard;
