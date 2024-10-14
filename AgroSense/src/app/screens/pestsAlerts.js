import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import FooterMenu from "../components/footerMenu";

const PestAlerts = ({ navigation }) => {
  // Mostrar alerta dentro de la app
  const showAlert = () => {
    alert("Se ha detectado una plaga en tu cultivo.");
  };

  // Agregar un botón de notificaciones (campanita) en el header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => alert("Aquí puedes ver las notificaciones")}
        >
          <Icon name="notifications-outline" size={25} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Botón para Mapa de Alertas Cercanas */}
      <TouchableOpacity
        style={styles.greenButton}
        onPress={() => navigation.navigate("MapaAlertasCercanas")}
      >
        <Text style={styles.buttonText}>Mapa de Alertas Cercanas</Text>
      </TouchableOpacity>

      {/* Botón para Noticias de la comunidad */}
      <TouchableOpacity
        style={[styles.greenButton, styles.marginTop]}
        onPress={() => navigation.navigate("NoticiasIPSA")}
      >
        <Text style={styles.buttonText}>Noticias de la comunidad</Text>
      </TouchableOpacity>

      {/* FooterMenu */}
      <FooterMenu navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
  greenButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  marginTop: {
    marginTop: 20,
  },
});

export default PestAlerts;
