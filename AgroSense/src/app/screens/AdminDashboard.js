import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Asegúrate de tener react-native-vector-icons instalado
import { db } from "../services/firebase"; // Configuración de Firestore
import { auth } from "../services/firebase"; // Configuración de Firebase Auth
import { signOut } from "firebase/auth";
import { collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { Picker } from "@react-native-picker/picker"; // Importación del selector
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Función para ajustar el tamaño de los elementos en función del ancho de la pantalla
const scale = (size) => width / 375 * size; // 375 es el ancho base

const AdminScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ nombre: "", email: "" });
  const [selectedUser, setSelectedUser] = useState(null);
  const roles = ["Administrador", "Usuario "]; // Roles disponibles

  // Obtener usuarios desde Firestore
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
      console.log(`Rol actualizado a ${newRole} para el usuario ${userId}`);
    } catch (error) {
      console.error("Error al asignar rol:", error);
    }
  };

  // Crear nuevo usuario
  const handleCreateUser = async () => {
    try {
      const usersRef = collection(db, "users");
      await addDoc(usersRef, {
        ...newUser,
        rol: "Usuario Estándar", // Asignar rol por defecto
      });
      setNewUser({ nombre: "", email: "" });
      console.log("Usuario creado correctamente");
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  // Editar usuario
  const handleEditUser = async () => {
    if (!selectedUser) return;
    const userRef = doc(db, "users", selectedUser.id);
    try {
      await updateDoc(userRef, { nombre: newUser.nombre, email: newUser.email });
      setSelectedUser(null);
      setNewUser({ nombre: "", email: "" });
      console.log("Usuario actualizado correctamente");
    } catch (error) {
      console.error("Error al editar usuario:", error);
    }
  };

  // Eliminar usuario
  const handleDeleteUser = async (userId) => {
    const userRef = doc(db, "users", userId);
    try {
      await deleteDoc(userRef);
      console.log("Usuario eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
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

  // Seleccionar usuario para editar
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setNewUser({ nombre: user.nombre, email: user.email });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Administración</Text>

      {/* Formulario para crear o editar usuarios */}
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={newUser.nombre}
        onChangeText={(text) => setNewUser({ ...newUser, nombre: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={newUser.email}
        onChangeText={(text) => setNewUser({ ...newUser, email: text })}
      />

      {/* Crear o Editar Usuario */}
      <TouchableOpacity
        style={styles.button}
        onPress={selectedUser ? handleEditUser : handleCreateUser}
      >
        <Text style={styles.buttonText}>{selectedUser ? "Editar Usuario" : "Crear Usuario"}</Text>
      </TouchableOpacity>

      {/* Lista de Usuarios */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userRow}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userRole}>Rol: {item.rol}</Text>

            {/* Selector de rol */}
            <Picker
              selectedValue={item.rol}
              style={styles.picker}
              onValueChange={(value) => handleAssignRole(item.id, value)}
            >
              {roles.map((role) => (
                <Picker.Item key={role} label={role} value={role} />
              ))}
            </Picker>

            {/* Botones de editar y eliminar */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity onPress={() => handleSelectUser(item)} style={styles.actionButton}>
                <Text style={styles.actionText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteUser(item.id)}
                style={[styles.actionButton, styles.deleteButton]}
              >
                <Text style={styles.actionText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Cerrar sesión */}
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
    padding: scale(16),
  },
  title: {
    fontSize: scale(24),
    fontWeight: "bold",
    marginBottom: scale(20),
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: scale(10),
    marginBottom: scale(10),
    borderRadius: scale(5),
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: scale(12),
    paddingHorizontal: scale(24),
    borderRadius: scale(8),
    marginBottom: scale(20),
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: scale(14),
  },
  userRow: {
    backgroundColor: "#fff",
    padding: scale(16),
    marginBottom: scale(10),
    borderRadius: scale(8),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 2,
  },
  userName: {
    fontSize: scale(18),
    fontWeight: "bold",
  },
  userRole: {
    fontSize: scale(14),
    color: "#555",
    marginVertical: scale(8),
  },
  picker: {
    height: scale(50),
    width: "100%",
    marginBottom: scale(10),
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    backgroundColor: "#007BFF",
    padding: scale(8),
    borderRadius: scale(5),
  },
  deleteButton: {
    backgroundColor: "#DC3545",
  },
  actionText: {
    color: "#fff",
    fontSize: scale(12),
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dc3545",
    paddingVertical: scale(12),
    paddingHorizontal: scale(24),
    borderRadius: scale(8),
    marginTop: scale(20),
  },
  logoutIcon: {
    marginRight: scale(8),
  },
  logoutText: {
    color: "#fff",
    fontSize: scale(16),
    fontWeight: "bold",
  },
});

export default AdminScreen;
