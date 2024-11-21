import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Función para ajustar el tamaño de los elementos en función del tamaño de la pantalla
const scale = (size) => width / 375 * size; // 375 es el ancho base del diseño

const firestore = getFirestore();

const CultivoDetailScreen = ({ route }) => {
  const { cultivo } = route.params;
  const navigation = useNavigation();

  const [editableCultivo, setEditableCultivo] = useState({ ...cultivo });
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    Alert.alert(
      "Eliminar cultivo",
      "¿Estás seguro de que deseas eliminar este cultivo?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          onPress: async () => {
            try {
              await deleteDoc(doc(firestore, "cultivos", cultivo.id));
              navigation.goBack(); // Regresar a la pantalla anterior
            } catch (error) {
              console.error("Error al eliminar el cultivo: ", error);
              alert("Hubo un error al eliminar el cultivo.");
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleUpdate = async () => {
    try {
      const cultivoRef = doc(firestore, "cultivos", cultivo.id);
      await updateDoc(cultivoRef, {
        nombre: editableCultivo.nombre,
        fecha: editableCultivo.fecha,
        etapa: editableCultivo.etapa, // Se actualizará la etapa seleccionada
        imagen: editableCultivo.imagen, // Si se actualiza la imagen también
      });
      setIsEditing(false); // Salir del modo edición
    } catch (error) {
      console.error("Error al actualizar el cultivo: ", error);
      alert("Hubo un error al actualizar el cultivo.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{editableCultivo.nombre}</Text>
      <Text style={styles.date}>Fecha de siembra: {editableCultivo.fecha}</Text>
      
      <Text style={styles.etapa}>Etapa de crecimiento:</Text>
      {isEditing ? (
        <Picker
          selectedValue={editableCultivo.etapa}
          style={styles.picker}
          onValueChange={(itemValue) => setEditableCultivo({ ...editableCultivo, etapa: itemValue })}
        >
          <Picker.Item label="Germinación" value="Germinación" />
          <Picker.Item label="Crecimiento Vegetativo" value="Crecimiento Vegetativo" />
          <Picker.Item label="Floración" value="Floración" />
          <Picker.Item label="Maduración" value="Maduración" />
        </Picker>
      ) : (
        <Text style={styles.etapaValue}>{editableCultivo.etapa}</Text>
      )}

      <Image source={{ uri: editableCultivo.imagen }} style={styles.image} />

      {/* Botones de editar y eliminar */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setIsEditing(!isEditing)}
        >
          <Text style={styles.buttonText}>{isEditing ? "Guardar" : "Editar"}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]} 
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>

      {isEditing && (
        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={handleUpdate}
        >
          <Text style={styles.saveButtonText}>Actualizar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(16),
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: scale(24),
    fontWeight: "bold",
    marginBottom: scale(8),
  },
  date: {
    fontSize: scale(16),
    color: "#666",
    marginBottom: scale(8),
  },
  etapa: {
    fontSize: scale(16),
    marginBottom: scale(8),
  },
  etapaValue: {
    fontSize: scale(16),
    color: "#555",
    marginBottom: scale(8),
  },
  picker: {
    width: '80%',
    height: scale(50),
    marginBottom: scale(16),
  },
  image: {
    width: scale(200),
    height: scale(200),
    borderRadius: 10,
    marginTop: scale(16),
    marginBottom: scale(20),
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: scale(16),
    flexWrap: 'wrap',
  },
  button: {
    flex: 1,
    marginHorizontal: scale(8),
    padding: scale(12),
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignItems: 'center',
    minWidth: scale(100),
  },
  deleteButton: {
    backgroundColor: "#DC3545",
  },
  buttonText: {
    color: "#fff",
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  saveButton: {
    marginTop: scale(16),
    padding: scale(12),
    backgroundColor: "#28A745",
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
  },
  saveButtonText: {
    color: "#fff",
    fontSize: scale(16),
    fontWeight: 'bold',
  },
});


export default CultivoDetailScreen;