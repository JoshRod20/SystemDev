import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FooterMenu from '../components/footerMenu'; // Importa el FooterMenu

const ChatbotScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Chatbot</Text>
        {/* Aquí iría la implementación del chatbot */}
      </View>
      
      {/* FooterMenu al final de la pantalla */}
      <FooterMenu navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Para alinear el contenido y el footer
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ChatbotScreen;
