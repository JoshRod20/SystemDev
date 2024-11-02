import { Text, View, Image, StyleSheet } from "react-native";
import React from "react";

const Library = ({ picture, info }) => {
  return (
    <View style={styles.libraryContainer}>
      <View style={styles.imageContainer}>
        <Image source={picture} style={styles.picture} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.info}>{info}</Text>
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
    paddingBottom: 40,
  },
  textContainer: {
    flex: 2,
    alignSelf: "center",
  },
});

export default Library;