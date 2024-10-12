import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

// Obtén las dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../app/assets/AgroSenseLogo.jpg')} style={styles.logo} />
      <Text style={styles.title}>"Bienvenido a AgroSense"</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  logo: {
    width: width * 0.5, // El tamaño de la imagen será el 50% del ancho de la pantalla
    height: height * 0.3, // El tamaño de la imagen será el 30% de la altura de la pantalla
    marginBottom: height * 0.05, // Margen inferior proporcional a la pantalla
  },
  title: {
    fontSize: width * 0.06, // El tamaño de la fuente es un 6% del ancho de la pantalla
    fontWeight: 'bold',
    marginBottom: height * 0.02,
    color: '#4A6B3E',
    textAlign: 'center', // Alineación central del texto
  },
  button: {
    backgroundColor: '#4A6B3E', // Color verde del botón
    width: width * 0.77, // El botón ocupará el 77% del ancho de la pantalla
    height: height * 0.055, // La altura del botón será un 5.5% de la altura de la pantalla
    borderRadius: 15, // Bordes redondeados
    justifyContent: 'center', // Centra el texto verticalmente
    alignItems: 'center', // Centra el texto horizontalmente
    paddingVertical: height * 0.01, // Padding vertical proporcional
    paddingHorizontal: width * 0.04, // Padding horizontal proporcional
  },
  buttonText: {
    color: '#FFF', // Texto blanco
    fontSize: width * 0.05, // El tamaño de la fuente del botón es un 5% del ancho de la pantalla
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
