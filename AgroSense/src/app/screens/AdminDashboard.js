import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { db } from "../services/firebase"; // Configuración de Firestore
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";

const AdminScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const roles = ["Administrador", "Usuario Estándar"]; // Roles disponibles

  // Obtener usuarios de Firestore
  useEffect(() => {
    const usersRef = collection(db, "users");
    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    });

    return unsubscribe; // Detener la suscripción
  }, []);

  // Asignar rol
  const handleAssignRole = async (userId, newRole) => {
    const userRef = doc(db, "users", userId);
    try {
      await updateDoc(userRef, { rol: newRole });
      console.log(`Rol asignado a ${newRole} para el usuario ${userId}`);
    } catch (error) {
      console.error("Error al asignar rol:", error);
    }
  };

  // Cerrar sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: "Welcome" }],
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Administración</Text>

      {/* Lista de usuarios */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userRow}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userRole}>Rol: {item.rol}</Text>
            <View style={styles.rolesContainer}>
              {roles.map((role) => (
                <TouchableOpacity
                  key={role}
                  style={[
                    styles.roleButton,
                    item.rol === role && styles.roleButtonActive,
                  ]}
                  onPress={() => handleAssignRole(item.id, role)}
                >
                  <Text
                    style={[
                      styles.roleButtonText,
                      item.rol === role && styles.roleButtonTextActive,
                    ]}
                  >
                    {role}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      />

      {/* Botón de cerrar sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" size={24} color="#fff" style={styles.logoutIcon} />
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  userRow: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userRole: {
    fontSize: 14,
    marginVertical: 8,
    color: "#555",
  },
  rolesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  roleButton: {
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  roleButtonActive: {
    backgroundColor: "#4CAF50",
  },
  roleButtonText: {
    fontSize: 14,
    color: "#555",
  },
  roleButtonTextActive: {
    color: "#fff",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dc3545",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AdminScreen;
