import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";

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
    marginLeft: 15,
    marginRight: 15,
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
  },
  info: {
    fontSize: 16,
    textAlign: "left",
    marginVertical: 5,
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
    marginTop: 5,
    height: 35,
    width: 170,
    marginLeft: 30,
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
