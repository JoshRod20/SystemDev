import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from '../components/button';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../app/assets/AgroSenseLogo.jpg')} style={styles.logo} />
      <Text style={styles.title}>Bienvenidos a AgroSense </Text>
      <Button title="Continuar" onPress={() => navigation.navigate('Register')} />
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
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4F7C44',
  },
});

export default WelcomeScreen;
