import React, { useState, useEffect} from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import FooterMenu from "../components/footerMenu";
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const CultivosScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [nameCultivo, setNameCultivo] = useState("");
  const [newEtapa, setNewEtapa] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date()); // Estado para la fecha seleccionada
  const [showDatePicker, setShowDatePicker] = useState(false); // Estado para mostrar el selector de fecha
  const [weeklyImages, setWeeklyImages] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled && result.assets && result.assets.length > 0) {
      setWeeklyImages([...weeklyImages, result.assets[0].uri]);
    }
  };

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Se necesitan permisos para acceder a las imágenes.');
    }
  };
  
  useEffect(() => {
    requestPermissions();
  }, []);

  const handleDateChange = (event, date) => {
    setShowDatePicker(false); // Oculta el selector de fecha después de la selección
    if (date) {
      setSelectedDate(date); // Actualiza la fecha seleccionada
    }
  };

  const [cultivos, setCultivos] = useState([]);

  const renderCultivo = ({ item }) => (
    <View style={styles.cultivoContainer}>
      <Image source={{ uri: item.imagen }} style={styles.cultivoImagen} />
      <View style={styles.cultivoInfo}>
        <Text style={styles.fecha}>{item.fecha}</Text>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={[styles.estado, item.estado === 'Completo' ? styles.completo : styles.incompleto]}>
          {item.estado}
        </Text>
      </View>
      <TouchableOpacity  style={styles.item}
            onPress={() => navigation.navigate('CultivoDetailScreen', { cultivo: item })}>
        <Text style={styles.detalleIcono}>›</Text>
      </TouchableOpacity>
    </View>
  );

  const agregarCultivo = () => {
    const nuevoCultivo = {
      id: (cultivos.length + 1).toString(),
      fecha: selectedDate.toLocaleDateString(),
      nombre: nameCultivo,
      estado: newEtapa ? "Completo" : "Incompleto", // "Completo" si hay etapa, "Incompleto" si no
      imagen: weeklyImages.length > 0 ? weeklyImages[0] : "https://via.placeholder.com/50",
    };
  
    setCultivos([...cultivos, nuevoCultivo]);
    setModalVisible(false);
    setNameCultivo("");
    setNewEtapa("");
    setSelectedDate(new Date());
    setWeeklyImages([]); // Limpiar las imágenes después de agregar el cultivo
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de cultivos</Text>
      <FlatList
        data={cultivos}
        renderItem={renderCultivo}
        keyExtractor={(item) => item.id}
      />

      {/* Botón para abrir el modal de agregar cultivo, colocado justo antes del FooterMenu */}
      <TouchableOpacity
        style={styles.addButtonFixed}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Agregar cultivo</Text>
      </TouchableOpacity>

      <FooterMenu navigation={navigation} />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Agregar nuevo cultivo</Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre del cultivo"
              value={nameCultivo}
              onChangeText={setNameCultivo}
            />
            {/* Botón para abrir el selector de fecha */}
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
              <Text style={styles.dateButtonText}>
                Fecha de siembra: {selectedDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            {/* Selector de fecha (DateTimePicker) */}
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Etapa de crecimiento"
              value={newEtapa}
              onChangeText={setNewEtapa}
            />

            {/* Botón personalizado para agregar imagen */}
            <TouchableOpacity style={styles.addButtonI} onPress={pickImage}>
              <Text style={styles.addButtonText}>Agregar imagen</Text>
            </TouchableOpacity>
            
            <ScrollView horizontal>
              {weeklyImages.map((uri, index) => (
                <Image key={index} source={{ uri }} style={styles.imagePreview} />
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.addButton}
              onPress={agregarCultivo}
            >
              <Text style={styles.addButtonText}>Agregar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  addButtonFixed: {
    position: "absolute",
    bottom: 100,
    left: "50%",
    transform: [{ translateX: -50 }],
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  addButtonI: {
    backgroundColor: "#5900ff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#ff000d",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 16,
  },
  cultivoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  cultivoImagen: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  cultivoInfo: {
    flex: 1,
  },
  fecha: {
    fontSize: 12,
    color: '#666',
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  estado: {
    fontSize: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  completo: {
    backgroundColor: '#D4EDDA',
    color: '#155724',
  },
  incompleto: {
    backgroundColor: '#F8D7DA',
    color: '#721C24',
  },
  detalleIcono: {
    fontSize: 24,
    color: '#CCC',
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginTop: 10,
  },
  dateButton: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    alignItems: "center",
  },
  dateButtonText: {
    fontSize: 16,
    color: "#333",
  },
});

export default CultivosScreen;