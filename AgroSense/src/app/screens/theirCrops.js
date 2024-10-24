import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Image,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import FooterMenu from "../components/footerMenu";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

const TheirCrops = ({ navigation }) => {
  const [cropName, setCropName] = useState("");
  const [growthStage, setGrowthStage] = useState("");
  const [weeklyImages, setWeeklyImages] = useState([]);
  const [location, setLocation] = useState(null);
  const [weatherAlert, setWeatherAlert] = useState(null);
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Error", "Permisos para acceder a la ubicación denegados");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      fetchWeatherAlert(loc.coords.latitude, loc.coords.longitude);
    })();
  }, []);

  const fetchWeatherAlert = async (latitude, longitude) => {
    try {
      const apiKey = "YOUR_OPENWEATHER_API_KEY"; // Coloca tu API Key de OpenWeather aquí
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      );
      const weather = response.data;

      if (weather.alerts) {
        setWeatherAlert(weather.alerts[0].description);
      } else {
        setWeatherAlert("No hay alertas meteorológicas en este momento");
      }
    } catch (error) {
      console.error("Error al obtener las alertas meteorológicas:", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setWeeklyImages([...weeklyImages, result.uri]);
    }
  };

  const addCrop = () => {
    if (cropName && growthStage) {
      const newCrop = {
        id: Date.now().toString(),
        name: cropName,
        growthStage,
        images: weeklyImages,
      };
      setCrops([...crops, newCrop]);
      setCropName("");
      setGrowthStage("");
      setWeeklyImages([]);
      Alert.alert("Éxito", "Cultivo registrado con éxito.");
    } else {
      Alert.alert("Error", "Por favor, completa todos los campos.");
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Seguimiento de Cultivos</Text>

          {/* Formulario para agregar nuevo cultivo */}
          <TextInput
            style={styles.input}
            placeholder="Nombre del Cultivo"
            value={cropName}
            onChangeText={setCropName}
          />
          <TextInput
            style={styles.input}
            placeholder="Etapa de Crecimiento"
            value={growthStage}
            onChangeText={setGrowthStage}
          />

          <Button title="Agregar Imagen " onPress={pickImage} />
          <ScrollView horizontal>
            {weeklyImages.map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.imagePreview} />
            ))}
          </ScrollView>

          <Button title="Registrar Cultivo" onPress={addCrop} />

          <Text style={styles.subtitle}>Alertas Meteorológicas</Text>
          <Text style={styles.weatherAlert}>
            {weatherAlert || "Cargando alertas..."}
          </Text>

          {/* Lista de cultivos registrados */}
          <FlatList
            data={crops}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cropItem}>
                <Text style={styles.cropName}>{item.name}</Text>
                <Text>Etapa de Crecimiento: {item.growthStage}</Text>
                <ScrollView horizontal>
                  {item.images.map((uri, index) => (
                    <Image
                      key={index}
                      source={{ uri }}
                      style={styles.imagePreview}
                    />
                  ))}
                </ScrollView>
              </View>
            )}
          />
        </ScrollView>
        <FooterMenu navigation={navigation} />
      </KeyboardAvoidingView>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginTop: 10,
  },
  weatherAlert: {
    fontSize: 16,
    marginBottom: 20,
    color: "red",
  },
  cropItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 20,
  },
  cropName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TheirCrops;
