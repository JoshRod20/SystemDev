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
    width: '45%',
    backgroundColor: '#D9D9D9',
    borderRadius: 15,
    padding: 15,
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
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FeatureButton;
