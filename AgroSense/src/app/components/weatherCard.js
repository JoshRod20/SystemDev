import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const WeatherCard = ({ weather }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.temperature}>{weather.main.temp}°C</Text>
      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }}
        style={styles.weatherIcon}
      />
      <Text style={styles.description}>{weather.weather[0].description}</Text>
      <Text style={styles.minMax}>Máx: {weather.main.temp_max}° Min: {weather.main.temp_min}°</Text>
      <Text style={styles.feelsLike}>Sensación térmica: {weather.main.feels_like}°C</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#BCEABB',
    height: hp('35%'), // 35% de la altura de la pantalla
    width: wp('90%'),  // 90% del ancho de la pantalla
    marginTop: hp('3%'), // 3% de la altura de la pantalla como margen superior
    marginBottom: hp('2%'), // 2% de margen inferior
    padding: wp('5%'), // 5% de padding basado en el ancho de la pantalla
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
    fontSize: wp('10%'), // Ajustar tamaño de fuente según el ancho de la pantalla
    fontWeight: 'bold',
  },
  weatherIcon: {
    width: wp('18%'), // Ajusta el tamaño del icono al 18% del ancho de la pantalla
    height: wp('18%'),
  },
  description: {
    fontSize: wp('4.5%'), // Ajusta la descripción para que sea más legible
  },
  minMax: {
    fontSize: wp('4%'), // Ajuste de la fuente de las temperaturas mín/máx
  },
  feelsLike: {
    fontSize: wp('4%'), // Ajuste de la fuente para la sensación térmica
  },
});

export default WeatherCard;
