import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const FooterMenu = ({ navigation }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate('Cultivos')}>
        <Image source={require('../../assets/cultivos.png')} style={styles.icon} />
        <Text>Cultivos</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ChatBot')}>
        <Image source={require('../../assets/chatbot.png')} style={styles.icon} />
        <Text>ChatBot</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Biblioteca')}>
        <Image source={require('../../assets/biblioteca.png')} style={styles.icon} />
        <Text>Biblioteca</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#d0e7d0',
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default FooterMenu;
