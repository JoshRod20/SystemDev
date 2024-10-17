import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, TouchableOpacity, Modal, TextInput, Button, Image } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

const MapaAlertasCercanas = () => {
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newMarker, setNewMarker] = useState(null);
  const [plagueName, setPlagueName] = useState('');
  const [plagueDescription, setPlagueDescription] = useState('');
  const [showPlagueMap, setShowPlagueMap] = useState(true); // Controla qué mapa mostrar (plagas o clima)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permisos para acceder a la ubicación denegados');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    })();
  }, []);

  const handlePressMap = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setNewMarker({ latitude, longitude });
    setIsModalVisible(true);
  };

  const handleSaveMarker = () => {
    if (newMarker && plagueName && plagueDescription) {
      setMarkers([...markers, { ...newMarker, name: plagueName, description: plagueDescription }]);
      setIsModalVisible(false);
      setPlagueName('');
      setPlagueDescription('');
      Alert.alert('Amenaza Agregada', 'Has agregado una nueva amenaza de plagas.', [{ text: 'OK' }]);
    } else {
      Alert.alert('Error', 'Debes llenar todos los campos.', [{ text: 'OK' }]);
    }
  };

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {region ? (
        showPlagueMap ? (
          <MapView
            style={styles.map}
            region={region}
            onPress={handlePressMap}
            showsUserLocation={true}
            mapType="satellite"
          >
            <Circle
              center={{ latitude: region.latitude, longitude: region.longitude }}
              radius={2000}
              strokeColor="rgba(0, 150, 0, 0.5)"
              fillColor="rgba(0, 150, 0, 0.2)"
            />

            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                title={marker.name}
                description={marker.description}
              />
            ))}
          </MapView>
        ) : (
          // Mapa climatológico (puedes configurar tu fuente de datos climáticos aquí)
          <MapView
            style={styles.map}
            region={region}
            showsUserLocation={true}
            mapType="terrain"
          >
            {/* Círculo para el radio de distancia en el mapa climatológico */}
            <Circle
              center={{ latitude: region.latitude, longitude: region.longitude }}
              radius={2000}
              strokeColor="rgba(0, 0, 150, 0.5)"
              fillColor="rgba(0, 0, 150, 0.2)"
            />
          </MapView>
        )
      ) : (
        <Text style={styles.loadingText}>Cargando mapa...</Text>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => Alert.alert('Selecciona un lugar en el mapa para agregar una amenaza.')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.toggleMapButton}
        onPress={() => setShowPlagueMap(!showPlagueMap)} // Cambia entre el mapa de plagas y clima
      >
        <Text style={styles.toggleMapButtonText}>
          {showPlagueMap ? 'Ver Mapa Climatológico' : 'Ver Mapa de Plagas'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Agregar Amenaza de Plaga</Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre de la Plaga"
              value={plagueName}
              onChangeText={setPlagueName}
            />

            <TextInput
              style={styles.input}
              placeholder="Descripción de la Plaga"
              value={plagueDescription}
              onChangeText={setPlagueDescription}
            />

            <Button title="Guardar" onPress={handleSaveMarker} />
            <Button title="Cancelar" color="red" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'green',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  toggleMapButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    backgroundColor: '#4682B4',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  toggleMapButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default MapaAlertasCercanas;
