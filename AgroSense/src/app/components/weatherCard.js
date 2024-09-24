import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const WeatherCard = ({ weather }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.temperature}>{weather.main.temp}°C</Text>
      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }}
        style={styles.weatherIcon}
      />
      <Text>{weather.weather[0].description}</Text>
      <Text>Máx: {weather.main.temp_max}° Min: {weather.main.temp_min}°</Text>
      <Text>Sensación térmica: {weather.main.feels_like}°C</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#BCEABB',
    height: 250,
    width: 380,
    marginTop: 30,
    marginBottom: 15,
    marginLeft: 15,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
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
    fontSize: 40,
    fontWeight: 'bold',
  },
  weatherIcon: {
    width: 70,
    height: 70,
  },
});

export default WeatherCard;
