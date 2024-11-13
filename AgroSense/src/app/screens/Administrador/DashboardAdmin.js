import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';

// Inicializa Firestore
const firestore = getFirestore();

export default function AdminDashboard({ navigation }) {
  const [users, setUsers] = useState([]);
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    const fetchUsersAndReportes = async () => {
      const users = await getDocs(collection(firestore, 'users')); // Asegúrate de que el nombre de la colección sea correcto
      const reportes = await getDocs(collection(firestore, 'reportes'));

      const usersList = [];
      users.forEach((doc) => {
        usersList.push({ id: doc.id, ...doc.data() });
      });
      setUsers(usersList);

      const reportesList = [];
      reportes.forEach((doc) => {
        reportesList.push({ id: doc.id, ...doc.data() });
      });
      setProjects(reportesList);
    };

    fetchUsersAndReportes();
  }, []);

  const handleEditUser = (userId) => {
    navigation.navigate('EditUser', { userId });
  };

  const handleEditReporte = (reporteId) => {
    navigation.navigate('EditReporte', { reporteId });
  };

  const renderUser = ({ item }) => (
    <View style={styles.userCard}>
      <Text style={styles.userName}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleEditUser(item.id)}>
        <Text style={styles.editText}>Editar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderReporte = ({ item }) => (
    <View style={styles.reporteCard}>
      <Text style={styles.reporteTitle}>{item.title}</Text>
      <TouchableOpacity onPress={() => handleEditReporte(item.id)}>
        <Text style={styles.editText}>Editar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Inicio')}>
          <MaterialCommunityIcons name="home-outline" size={28} color="#003366" />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Reportes')}>
          <MaterialCommunityIcons name="account-multiple-outline" size={28} color="#003366" />
          <Text style={styles.navText}>Reportes y monitoreo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('BibliotecaAgro')}>
          <MaterialCommunityIcons name="file-document-outline" size={28} color="#003366" />
          <Text style={styles.navText}>Biblioteca Agricola</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('AdminPerfil')}>
          <MaterialCommunityIcons name="account-multiple-outline" size={28} color="#003366" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    padding: 20,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#003366',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  usersList: {
    marginBottom: 20,
  },
  reporteList: {
    marginBottom: 20,
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  reporteCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reporteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  editText: {
    color: '#1E90FF',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
