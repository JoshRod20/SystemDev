import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const WeatherCard = ({ weather }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.temperature}>{weather.temperature}°</Text>
      <Image source={require('../../assets/cloudy.png')} style={styles.weatherIcon} />
      <Text>{weather.description}</Text>
      <Text>Max: {weather.maxTemp}° Min: {weather.minTemp}°</Text>
      <Text>Sensación térmica: {weather.feelsLike}°</Text>
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
