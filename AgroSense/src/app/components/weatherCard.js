import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { getWeatherIcon } from '../services/wheatherServices'; 

const WeatherCard = ({ weather }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.temperature}>{weather.main.temp}°</Text>
      <Image source={{ uri: getWeatherIcon(weather.weather[0].icon) }} style={styles.weatherIcon} />
      <Text>{weather.weather[0].description}</Text>
      <Text>Max: {weather.main.temp_max}° Min: {weather.main.temp_min}°</Text>
      <Text>Sensación térmica: {weather.main.feels_like}°</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#d4f7c5',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  temperature: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
});

export default WeatherCard;
