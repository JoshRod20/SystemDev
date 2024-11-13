import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, Alert, FlatList } from 'react-native';
import FooterMenu from '../components/footerMenu';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

const TheirCrops = ({ navigation }) => {
  const [cropName, setCropName] = useState('');
  const [growthStage, setGrowthStage] = useState('');
  const [weeklyImages, setWeeklyImages] = useState([]);
  const [location, setLocation] = useState(null);
  const [crops, setCrops] = useState([]);
  const mapRef = useRef(null);  // Referencia para el MapView

  // Solicitar permisos de ubicación y obtener la ubicación actual
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Error', 'Permisos para acceder a la ubicación denegados');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  // Función para seleccionar una imagen semanal
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

  // Función para registrar un nuevo cultivo
  const addCrop = () => {
    if (cropName && growthStage) {
      const newCrop = {
        id: Date.now().toString(),
        name: cropName,
        growthStage,
        images: weeklyImages,
      };
      setCrops([...crops, newCrop]);
      setCropName('');
      setGrowthStage('');
      setWeeklyImages([]);
      Alert.alert('Éxito', 'Cultivo registrado con éxito.');
    } else {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
    }
  };

  // Función para centrar el mapa en la ubicación actual
  const centerMapOnLocation = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={crops}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.centered}>
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

            <View style={styles.buttonContainer}>
              <Button title="Agregar Imagen Semanal" onPress={pickImage} />
            </View>

            <FlatList
              horizontal
              data={weeklyImages}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Image source={{ uri: item }} style={styles.imagePreview} />
              )}
              showsHorizontalScrollIndicator={false}
            />

            <View style={styles.buttonContainer}>
              <Button style={styles.registerButton} title="Registrar Cultivo" onPress={addCrop} />
            </View>

            {/* Mapa de ubicación de los cultivos con vista satelital */}
            {location && (
              <View style={styles.centered}>
                <Text style={styles.subtitle}>Ubicación de tus Cultivos</Text>
                <MapView
                  ref={mapRef}
                  style={styles.map}
                  mapType="satellite"
                  initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
                    }}
                    title="Ubicación del cultivo"
                  />
                </MapView>

                {/* Botón para redirigirte a tu ubicación inicial */}
                <View style={styles.buttonContainer}>
                  <Button title="Centrar en mi Ubicación" onPress={centerMapOnLocation} />
                </View>
              </View>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.cropItem}>
            <Text style={styles.cropName}>{item.name}</Text>
            <Text>Etapa de Crecimiento: {item.growthStage}</Text>
            <FlatList
              horizontal
              data={item.images}
              keyExtractor={(uri, index) => index.toString()}
              renderItem={({ item: uri }) => (
                <Image source={{ uri }} style={styles.imagePreview} />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
        ListFooterComponent={<FooterMenu navigation={navigation} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 7,
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '90%',
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginTop: 10,
  },
  cropItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  cropName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  map: {
    width: 360,
    height: 260,
    marginTop: 20,
    marginBottom: 20,
  },
});

export default TheirCrops;
