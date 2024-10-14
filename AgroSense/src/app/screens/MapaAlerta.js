import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, TouchableOpacity, Modal, TextInput, Button, Image } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

const MapaAlertasCercanas = () => {
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // Controlar la visibilidad del modal
  const [newMarker, setNewMarker] = useState(null); // Almacenar la ubicación seleccionada
  const [plagueName, setPlagueName] = useState(''); // Nombre de la plaga
  const [plagueDescription, setPlagueDescription] = useState(''); // Descripción de la plaga

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

  // Función para seleccionar una ubicación en el mapa
  const handlePressMap = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setNewMarker({ latitude, longitude });
    setIsModalVisible(true); // Mostrar el modal cuando se selecciona la ubicación
  };

  // Función para guardar la amenaza y cerrar el modal
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

  // Mostrar mensaje de error si no se concede acceso a la ubicación
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
        <MapView
          style={styles.map}
          region={region}
          onPress={handlePressMap} // Permitir seleccionar una ubicación en el mapa
          showsUserLocation={true} // Mostrar la ubicación actual del usuario
          mapType="satellite" // Cambia el mapa a satélite
        >
          {/* Radio de distancia de 2 km */}
          <Circle
            center={{ latitude: region.latitude, longitude: region.longitude }}
            radius={2000} // Radio de 2km
            strokeColor="rgba(0, 150, 0, 0.5)"
            fillColor="rgba(0, 150, 0, 0.2)"
          />

          {/* Marcadores de amenazas de plagas con íconos personalizados */}
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              title={marker.name}
              description={marker.description}
              // icon={require('./assets/plaga_icon.png')} // Ruta del ícono de la plaga
            />
          ))}
        </MapView>
      ) : (
        <Text style={styles.loadingText}>Cargando mapa...</Text>
      )}

      {/* Botón flotante para agregar alertas manualmente */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => Alert.alert('Selecciona un lugar en el mapa para agregar una amenaza.')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Modal para el formulario de la plaga */}
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
