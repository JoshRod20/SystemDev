import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import { db } from "../services/firebase"; // Configuración de Firestore
import { collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { auth } from "../services/firebase"; // Firebase Auth
import { signOut } from "firebase/auth";
import Icon from "react-native-vector-icons/MaterialIcons";

const UserManagementScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ nombre: "", email: "" });
  const [selectedUser, setSelectedUser] = useState(null);

  // Obtener usuarios desde Firestore
  useEffect(() => {
    const usersRef = collection(db, "users");
    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    });

    return unsubscribe; // Detener la suscripción
  }, []);

  // Función para cerrar sesión
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

  // Seleccionar un usuario para editar
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setNewUser({ nombre: user.nombre, email: user.email });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Usuarios</Text>

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
            <Text style={styles.userName}>{item.nombre}</Text>
            <Text style={styles.userRole}>Rol: {item.rol}</Text>
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
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  userRow: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 10,
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
    color: "#555",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    backgroundColor: "#007BFF",
    padding: 8,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#DC3545",
  },
  actionText: {
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

export default UserManagementScreen;
