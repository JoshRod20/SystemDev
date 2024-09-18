import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text } from 'react-native';

const GoogleButton = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Image source={require('../assets/icons8-logo-de-google-48.png')} style={styles.icon} />
    <Text style={styles.text}>Sign in with Google</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderColor: '#B0B0B0',
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: '#707070',
  },
});

export default GoogleButton;
