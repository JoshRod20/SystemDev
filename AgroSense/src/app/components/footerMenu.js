import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const FooterMenu = ({ navigation }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate('MainScreen')} style={styles.menuItem}>
        <Image source={require('../../app/assets/casa-48.png')} style={styles.icon} />
        <Text style={styles.menuText}>Inicio</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cultivos')} style={styles.menuItem}>
        <Image source={require('../../app/assets/cultivos-48.png')} style={styles.icon} />
        <Text style={styles.menuText}>Sus cultivos</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ChatBot')} style={styles.menuItem}>
        <Image source={require('../../app/assets/chatbot-48.png')} style={styles.icon} />
        <Text style={styles.menuText}>ChatBot</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Biblioteca')} style={styles.menuItem}>
        <Image source={require('../../app/assets/biblioteca-48.png')} style={styles.icon} />
        <Text style={styles.menuText}>Biblioteca agrícola</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#d0e7d0',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  menuItem: {
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
  menuText: {
    fontSize: 12,
    marginTop: 5,
    color: '#333',
  },
});

export default FooterMenu;
