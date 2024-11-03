import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

const { width } = Dimensions.get("window"); // Obtener el ancho de la pantalla

const Library = ({ picture, info, onPressButton }) => {
  return (
    <View style={styles.libraryContainer}>
      <View style={styles.imageContainer}>
        <Image source={picture} style={styles.picture} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.info}>{info}</Text>
        <TouchableOpacity style={styles.libraryButton} onPress={onPressButton}>
          <Text style={styles.buttonText}>Más información</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  libraryContainer: {
    flex: 1,
    flexDirection: "row",
    minHeight: 190,
    backgroundColor: "#B7D2BF",
    borderRadius: 17,
    marginTop: 15,
    marginHorizontal: width * 0.05, // Margen horizontal responsivo
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  imageContainer: {
    flex: 1,
    alignSelf: "center",
  },
  picture: {
    height: 110,
    width: "95%",
    resizeMode: "contain", // Asegurarse de que la imagen se ajuste bien
  },
  info: {
    fontSize: width < 400 ? 14 : 16, // Tamaño de texto adaptativo
    textAlign: "left",
    marginVertical: 5,
    paddingRight: 7,
    paddingBottom: 20,
  },
  textContainer: {
    flex: 2,
    alignSelf: "center",
  },
  libraryButton: {
    backgroundColor: "#B7D2BF", // Color de fondo del botón
    borderRadius: 17,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    marginTop: 3,
    height: 35,
    width: "100%", // Botón de ancho completo
    maxWidth: 170, // Ancho máximo del botón
    alignSelf: "center", // Centrar el botón
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  buttonText: {
    color: "black", // Color del texto del botón
    textAlign: 'center',
    fontSize: 15,
    fontWeight: "bold",
    paddingVertical: 2,
  },
});

export default Library;
