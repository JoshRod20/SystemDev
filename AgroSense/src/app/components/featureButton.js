import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const FeatureButton = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 150,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5,
  },
  icon: {
    width: 48,
    height: 45,
    padding: 15,
    marginBottom: 10,
  },
  label: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FeatureButton;
