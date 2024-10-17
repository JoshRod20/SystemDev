import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const WelcomeScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={["#fff", "#4A6B3E"]} style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../../app/assets/AgroSenseLogo-removebg.png')} style={styles.logo} />
        <Text style={styles.title}>“Bienvenido a AgroSense”</Text>
        
        {/* Botón personalizado */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4A6B3E',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 18,
    marginTop: 10,
    height: 55, // Ajuste para dar más espacio al texto
    width: 270,
    justifyContent: 'center',  // Centrado vertical del texto
    alignItems: 'center',      // Centrado horizontal del texto
    elevation: 5, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
