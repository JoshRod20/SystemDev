import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';

const MapaAlertasCercanas = () => {
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newMarker, setNewMarker] = useState(null);
  const [plagueName, setPlagueName] = useState('');
  const [plagueDescription, setPlagueDescription] = useState('');
  const [loading, setLoading] = useState(false);  // Indicador de carga

  const firestore = getFirestore();

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

      fetchMarkers();
    })();
  }, []);

  const fetchMarkers = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'plaga_mapa'));
      const loadedMarkers = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(marker => marker.latitude !== undefined && marker.longitude !== undefined);  // Filtrar marcadores sin coordenadas

      setMarkers(loadedMarkers);
    } catch (error) {
      console.error('Error al cargar los marcadores:', error);
      setErrorMsg('Error al cargar los marcadores');
    }
  };

  const handlePressMap = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setNewMarker({ latitude, longitude });
    setIsModalVisible(true);
  };

  const handleSaveMarker = async () => {
    if (newMarker && plagueName && plagueDescription) {
      setLoading(true);  // Mostrar indicador de carga mientras se guarda el marcador
      try {
        const docRef = await addDoc(collection(firestore, 'plaga_mapa'), {
          name: plagueName,
          description: plagueDescription,
          latitude: newMarker.latitude,
          longitude: newMarker.longitude,
          timestamp: serverTimestamp(),
        });

        setMarkers([...markers, { id: docRef.id, ...newMarker, name: plagueName, description: plagueDescription }]);

        setIsModalVisible(false);
        setPlagueName('');
        setPlagueDescription('');
        Alert.alert('Amenaza Agregada', 'Has agregado una nueva amenaza de plagas.', [{ text: 'OK' }]);
      } catch (error) {
        Alert.alert('Error', 'No se pudo agregar la amenaza. Intenta de nuevo.', [{ text: 'OK' }]);
        console.error('Error al guardar en Firestore:', error);
      } finally {
        setLoading(false);  // Ocultar el indicador de carga
      }
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

          {markers.map((marker) => {
            if (marker.latitude && marker.longitude) {  // Validación para evitar errores de coordenadas undefined
              return (
                <Marker
                  key={marker.id}
                  coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                  title={marker.name}
                  description={marker.description}
                />
              );
            } else {
              console.warn('Coordenadas inválidas para el marcador:', marker);
              return null;
            }
          })}
        </MapView>
      ) : (
        <Text style={styles.loadingText}>Cargando mapa...</Text>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => Alert.alert('Selecciona un lugar en el mapa para agregar una amenaza.')}
      >
        <Text style={styles.addButtonText}>+</Text>
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

            <Button title="Guardar" onPress={handleSaveMarker} disabled={loading} />
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
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    width: '100%',
  },
});

export default MapaAlertasCercanas;
