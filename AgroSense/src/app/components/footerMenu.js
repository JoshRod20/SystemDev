import React, { useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";

const { width } = Dimensions.get("window");

const FooterMenu = ({ navigation }) => {
  // Referencias para animaciones
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Función para manejar la animación del texto
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.2, // Escala el texto al 120%
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1, // Regresa a su tamaño original
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => navigation.navigate("MainScreen")}
        style={styles.menuItem}
      >
        <Image
          source={require("../../app/assets/home-svgrepo-com.png")}
          style={styles.icon}
        />
        <Animated.Text style={[styles.menuText, { transform: [{ scale: scaleAnim }] }]}>
          Inicio
        </Animated.Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => navigation.navigate("theirCrops")}
        style={styles.menuItem}
      >
        <Image
          source={require("../../app/assets/advice.png")}
          style={styles.icon}
        />
        <Animated.Text style={[styles.menuText, { transform: [{ scale: scaleAnim }] }]}>
          Sus cultivos
        </Animated.Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => navigation.navigate("ChatBot")}
        style={styles.menuItem}
      >
        <Image
          source={require("../../app/assets/chatbot.png")}
          style={styles.icon}
        />
        <Animated.Text style={[styles.menuText, { transform: [{ scale: scaleAnim }] }]}>
          ChatBot
        </Animated.Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => navigation.navigate("agriculturalLibrary")}
        style={styles.menuItem}
      >
        <Image
          source={require("../../app/assets/library.png")}
          style={styles.icon}
        />
        <Animated.Text style={[styles.menuText, { transform: [{ scale: scaleAnim }] }]}>
          AgroBiblio
        </Animated.Text>
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
