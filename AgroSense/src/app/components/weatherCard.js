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
    height: height * 0.3, // Altura ajustada dinámicamente
    width: width * 0.9,   // Ancho ajustado dinámicamente
    marginTop: height * 0.03,
    marginBottom: height * 0.02,
    padding: width * 0.05, // Padding dinámico
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center', // Centra el contenido verticalmente
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  temperature: {
    fontSize: width * 0.1, // Tamaño de la fuente dinámico
    fontWeight: 'bold',
    textAlign: 'center', // Centra el texto
  },
  weatherIcon: {
    width: width * 0.2,  // Ajustar el tamaño del ícono dinámicamente
    height: width * 0.2,
    marginVertical: 10, // Añade un margen vertical
  },
  description: {
    fontSize: width * 0.045, // Tamaño de la fuente dinámico
    marginTop: 5,
    textAlign: 'center', // Centra el texto
  },
  minMax: {
    fontSize: width * 0.04, // Tamaño de la fuente dinámico
    marginTop: 5,
    textAlign: 'center', // Centra el texto
  },
  feelsLike: {
    fontSize: width * 0.04, // Tamaño de la fuente dinámico
    marginTop: 5,
    textAlign: 'center', // Centra el texto
  },
});

export default WeatherCard;
