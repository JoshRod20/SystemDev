import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Image, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const NoticiasIPSA = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [news, setNews] = useState([]);

  // Función para abrir el selector de imágenes
  const pickImage = async () => {
    try {
      // Solicitar permiso de la galería
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert('Permiso denegado', 'Se necesita acceso a la galería para seleccionar una imagen.');
        return;
      }

      let pickedImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false, // Mantenerlo en false para evitar la opción de cortar la imagen
        aspect: [4, 3],
        quality: 1,
      });

      if (!pickedImage.cancelled) {
        setImage(pickedImage.uri);  // Establecer la imagen seleccionada en el estado
      } else {
        Alert.alert('Imagen no seleccionada', 'No se seleccionó ninguna imagen.');
      }
    } catch (error) {
      console.error('Error seleccionando imagen:', error);
      Alert.alert('Error', 'Hubo un problema al seleccionar la imagen.');
    }
  };

  // Función para agregar una noticia
  const addNewsItem = () => {
    if (title.trim() === '' || description.trim() === '') {
      Alert.alert('Error', 'El título y la descripción son obligatorios.');
      return;
    }

    if (!image) {
      Alert.alert('Error', 'Debe seleccionar una imagen.');
      return;
    }

    // Agregar la nueva noticia
    setNews([...news, { title, description, image }]);

    // Limpiar los campos
    setTitle('');
    setDescription('');
    setImage(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Noticias de la comunidad - IPSA</Text>

      <ScrollView style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Título de la noticia"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.input}
          placeholder="Descripción de la noticia"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
          <Text style={styles.imagePickerText}>Seleccionar Imagen</Text>
        </TouchableOpacity>

        {/* Vista previa de la imagen */}
        {image && (
          <View style={styles.previewContainer}>
            <Text style={styles.previewText}>Vista previa de la imagen:</Text>
            <Image source={{ uri: image }} style={styles.previewImage} />
          </View>
        )}

        <Button title="Agregar Noticia" onPress={addNewsItem} />
      </ScrollView>

      <ScrollView style={styles.newsContainer}>
        {news.map((newsItem, index) => (
          <View key={index} style={styles.newsItem}>
            <Text style={styles.newsTitle}>{newsItem.title}</Text>
            <Text style={styles.newsDescription}>{newsItem.description}</Text>
            {newsItem.image && <Image source={{ uri: newsItem.image }} style={styles.newsImage} />}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  imagePickerButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  imagePickerText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  previewContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  previewText: {
    fontSize: 16,
    marginBottom: 10,
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 5,
  },
  newsContainer: {
    marginTop: 20,
  },
  newsItem: {
    marginBottom: 20,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  newsDescription: {
    fontSize: 16,
    marginTop: 5,
  },
  newsImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 5,
  },
});

export default NoticiasIPSA;
