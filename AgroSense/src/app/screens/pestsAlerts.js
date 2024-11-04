<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const PestAlerts = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]); // Estado para las notificaciones
  const [modalVisible, setModalVisible] = useState(false); // Estado para mostrar/ocultar el modal

  // Simulación de alerta de plaga (puedes conectar esto con Firestore más adelante)
  useEffect(() => {
    const fakeNotification = {
      id: Math.random().toString(),
      message: "Se ha detectado una plaga en tu cultivo cercano.",
    };
    setNotifications((prev) => [...prev, fakeNotification]);
  }, []); // Se ejecuta al montar el componente

  // Mostrar notificaciones en un modal al hacer clic en la campanita
  const showNotifications = () => {
    setModalVisible(true);
=======
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import FooterMenu from "../components/footerMenu";

const PestAlerts = ({ navigation }) => {
  // Mostrar alerta dentro de la app
  const showAlert = () => {
    alert("Se ha detectado una plaga en tu cultivo.");
>>>>>>> 5f07213db87065d03ed6ab0080fea26a52ea9eb0
  };

  // Agregar el ícono de campanita en el header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 15 }}
<<<<<<< HEAD
          onPress={showNotifications}
=======
          onPress={() => alert("Aquí puedes ver las notificaciones")}
>>>>>>> 5f07213db87065d03ed6ab0080fea26a52ea9eb0
        >
          <Icon name="notifications-outline" size={25} color="black" />
          {/* Muestra un punto rojo si hay notificaciones nuevas */}
          {notifications.length > 0 && (
            <View style={styles.notificationBadge} />
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, notifications]);

  return (
    <View style={styles.container}>
      {/* Modal para mostrar las notificaciones */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notificaciones</Text>
            <FlatList
              data={notifications}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.notificationItem}>
                  <Text>{item.message}</Text>
                </View>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  // Estilo para el badge de notificación
  notificationBadge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "red",
    borderRadius: 5,
    width: 10,
    height: 10,
  },
  // Estilos para el modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  notificationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  closeButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default PestAlerts;
