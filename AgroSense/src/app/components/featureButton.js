import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

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
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    margin: 10,
    width: '40%',
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default FeatureButton;
