import React from 'react';
import { View, Text, StyleSheet, Button, Linking, Alert } from 'react-native';

const NoticiasIPSA = () => {
  // Función para abrir la URL de IPSA
  const openIPSAWebsite = async () => {
    const url = 'https://www.ipsa.gob.ni/NOTICIAS';

    // Verifica si la URL puede ser abierta
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Abre el sitio web
      await Linking.openURL(url);
    } else {
      // Si no es posible abrir, muestra un mensaje de error
      Alert.alert(`No se puede abrir el sitio: ${url}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Noticias del IPSA</Text>
      <Text style={styles.description}>
        Mantente al tanto de las últimas noticias del IPSA visitando su sitio web.
      </Text>
      <Button
        title="Ver Noticias del IPSA"
        onPress={openIPSAWebsite}
        color="green"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default NoticiasIPSA;
