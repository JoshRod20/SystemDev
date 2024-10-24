import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const FooterMenu = ({ navigation }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("MainScreen")}
        style={styles.menuItem}
      >
        <Image
          source={require("../../app/assets/home-svgrepo-com.png")}
          style={styles.icon}
        />
        <Text style={styles.menuText}>Inicio</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("theirCrops")}
        style={styles.menuItem}
      >
        <Image
          source={require("../../app/assets/advice.png")}
          style={styles.icon}
        />
        <Text style={styles.menuText}>Sus cultivos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("ChatBot")}
        style={styles.menuItem}
      >
        <Image
          source={require("../../app/assets/chatbot.png")}
          style={styles.icon}
        />
        <Text style={styles.menuText}>ChatBot</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("agriculturalLibrary")}
        style={styles.menuItem}
      >
        <Image
          source={require("../../app/assets/library.png")}
          style={styles.icon}
        />
        <Text style={styles.menuText}>AgroBiblio</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#B7D2BF",
    paddingVertical: 5,
    borderTopWidth: 1,
    borderRadius: 15,
    borderTopColor: "#ddd",
    marginBottom: 20,
    position: "absolute",
    bottom: 0,
    left: 20,
    right: 20,
    // Propiedades de sombra
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3, // Sombra orientada hacia arriba para dar efecto de elevación
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Propiedad específica para Android
  },
  menuItem: {
    alignItems: "center",
    width: width * 0.35,
  },
  icon: {
    width: 30,
    height: 30,
  },
  menuText: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
    color: "#181818",
    textAlign: "center",
  },
});

export default FooterMenu;
