import React, { useState, useEffect } from "react";
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
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { getFirestore, collection, addDoc, onSnapshot } from "firebase/firestore"; // Importación de funciones de Firestore
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const firestore = getFirestore();

const CultivosScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [nameCultivo, setNameCultivo] = useState("");
  const [selectedEtapa, setSelectedEtapa] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [weeklyImages, setWeeklyImages] = useState([]);
  const [cultivos, setCultivos] = useState([]);

  const etapasDeCrecimiento = [
    { label: "Germinación (0-2 semanas)", value: "Germinación" },
    { label: "Crecimiento (3-6 semanas)", value: "Crecimiento" },
    { label: "Floración (7-9 semanas)", value: "Floración" },
    { label: "Maduración (10-12 semanas)", value: "Maduración" },
  ];

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
    if (status !== "granted") {
      alert("Se necesitan permisos para acceder a las imágenes.");
    }
  };

  useEffect(() => {
    requestPermissions();
    const cultivosRef = collection(firestore, "cultivos");

    // Escuchar cambios en la colección "cultivos" en tiempo real
    const unsubscribe = onSnapshot(cultivosRef, (snapshot) => {
      const cultivosData = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id, // Guarda el ID del documento
      }));
      setCultivos(cultivosData); // Actualiza el estado con los cultivos obtenidos
    });

    return () => unsubscribe(); // Limpiar la suscripción cuando el componente se desmonte
  }, []);

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const agregarCultivo = async () => {
    const nuevoCultivo = {
      fecha: selectedDate.toLocaleDateString(),
      nombre: nameCultivo,
      etapa: selectedEtapa,
      imagen: weeklyImages.length > 0 ? weeklyImages[0] : "https://via.placeholder.com/50",
    };

    try {
      // Guarda el cultivo en la colección "cultivos" en Firestore
      await addDoc(collection(firestore, "cultivos"), nuevoCultivo);
    } catch (error) {
      console.error("Error al guardar el cultivo: ", error);
      alert("Hubo un error al guardar el cultivo.");
    }

    // Resetea el estado del formulario
    setModalVisible(false);
    setNameCultivo("");
    setSelectedEtapa("");
    setSelectedDate(new Date());
    setWeeklyImages([]);
  };

  const renderCultivo = ({ item }) => (
    <View style={styles.cultivoContainer}>
      <Image source={{ uri: item.imagen }} style={styles.cultivoImagen} />
      <View style={styles.cultivoInfo}>
        <Text style={styles.fecha}>{item.fecha}</Text>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.etapa}>{item.etapa}</Text>
      </View>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("CultivoDetailScreen", { cultivo: item })}
      >
        <Text style={styles.detalleIcono}>›</Text>
      </TouchableOpacity>
    </View>
  );

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de cultivos</Text>
      <FlatList
        data={cultivos}
        renderItem={renderCultivo}
        keyExtractor={(item) => item.id.toString()}
      />

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
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
              <Text style={styles.dateButtonText}>
                Fecha de siembra: {selectedDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            <Picker
              selectedValue={selectedEtapa}
              onValueChange={(itemValue) => setSelectedEtapa(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Seleccionar etapa de crecimiento" value="" />
              {etapasDeCrecimiento.map((etapa, index) => (
                <Picker.Item key={index} label={etapa.label} value={etapa.value} />
              ))}
            </Picker>
            <TouchableOpacity style={styles.addButtonI} onPress={pickImage}>
              <Text style={styles.addButtonText}>Agregar imagen</Text>
            </TouchableOpacity>
            <ScrollView horizontal>
              {weeklyImages.map((uri, index) => (
                <Image key={index} source={{ uri }} style={styles.imagePreview} />
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.addButton} onPress={agregarCultivo}>
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
    padding: width * 0.04,  // 4% del ancho de la pantalla
    backgroundColor: "#fff",
  },
  addButtonFixed: {
    position: "absolute",
    bottom: height * 0.12,  // 12% desde el fondo
    left: "50%",
    transform: [{ translateX: -50 }],
    backgroundColor: "#28a745",
    padding: width * 0.04,  // 4% del ancho de la pantalla
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
    width: width * 0.8,  // 80% del ancho de la pantalla
    padding: width * 0.05,  // 5% del ancho de la pantalla
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: width * 0.05,  // 5% del ancho de la pantalla
    fontWeight: "bold",
    marginBottom: height * 0.02,  // 2% de la altura de la pantalla
  },
  input: {
    width: "100%",
    padding: width * 0.04,  // 4% del ancho de la pantalla
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: height * 0.02,  // 2% de la altura de la pantalla
  },
  addButtonI: {
    backgroundColor: "#5900ff",
    padding: width * 0.04,  // 4% del ancho de la pantalla
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginBottom: height * 0.015,  // 1.5% de la altura de la pantalla
  },
  addButton: {
    backgroundColor: "#28a745",
    padding: width * 0.04,  // 4% del ancho de la pantalla
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginBottom: height * 0.015,  // 1.5% de la altura de la pantalla
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: height * 0.015,  // 1.5% de la altura de la pantalla
    backgroundColor: "#ff000d",
    padding: width * 0.04,  // 4% del ancho de la pantalla
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
    fontSize: width * 0.065,  // 6.5% del ancho de la pantalla
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: height * 0.02,  // 2% de la altura de la pantalla
  },
  cultivoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.02,  // 2% de la altura de la pantalla
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  cultivoImagen: {
    width: width * 0.13,  // 13% del ancho de la pantalla
    height: width * 0.13,  // 13% del ancho de la pantalla
    borderRadius: 8,
    marginRight: width * 0.05,  // 5% del ancho de la pantalla
  },
  cultivoInfo: {
    flex: 1,
  },
  fecha: {
    fontSize: width * 0.03,  // 3% del ancho de la pantalla
    color: '#666',
  },
  nombre: {
    fontSize: width * 0.04,  // 4% del ancho de la pantalla
    fontWeight: 'bold',
  },
  estado: {
    fontSize: width * 0.03,  // 3% del ancho de la pantalla
    paddingVertical: height * 0.005,  // 0.5% de la altura de la pantalla
    paddingHorizontal: width * 0.02,  // 2% del ancho de la pantalla
    borderRadius: 12,
    textAlign: 'center',
    marginTop: height * 0.01,  // 1% de la altura de la pantalla
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
    fontSize: width * 0.1,  // 10% del ancho de la pantalla
    color: 'black',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: width * 0.25,  // 25% del ancho de la pantalla
    height: width * 0.25,  // 25% del ancho de la pantalla
    marginRight: width * 0.03,  // 3% del ancho de la pantalla
    marginTop: height * 0.02,  // 2% de la altura de la pantalla
  },
  dateButton: {
    width: "100%",
    padding: width * 0.04,  // 4% del ancho de la pantalla
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: height * 0.02,  // 2% de la altura de la pantalla
    alignItems: "center",
  },
  dateButtonText: {
    fontSize: width * 0.04,  // 4% del ancho de la pantalla
    color: "#333",
  },
  item: {
    marginRight: width * 0.08,  // 8% del ancho de la pantalla
  },
});


export default CultivosScreen;