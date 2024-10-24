import React, { useState, useEffect, useRef } from "react";
import * as GoogleGenerativeAI from "@google/generative-ai";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import FooterMenu from "../components/footerMenu";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native"; // Importar el hook useNavigation

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showStopIcon, setShowStopIcon] = useState(false);
  const currentGeneration = useRef(null);
  const navigation = useNavigation(); // Usar useNavigation para obtener la referencia

  const API_KEY = "AIzaSyDvXtfYrTjnq9FU-6aPNk9ahItFTtyKpZo";

  useEffect(() => {
    const startChat = async () => {
      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Mensaje inicial de Agri
      const initialMessage =
        "¡Hola! Bienvenido, soy Agri, tu asistente de AgroSense. ¿En qué puedo ayudarte hoy?";

      // Se añade el mensaje inicial al chat
      setMessages([
        {
          text: initialMessage,
          user: false,
        },
      ]);

      // Mostrar mensaje de bienvenida
      showMessage({
        message: "Bienvenido, soy Agri 🤖",
        description: initialMessage,
        type: "info",
        icon: "info",
        duration: 2000,
      });
    };
    startChat();
  }, []);

  const cleanText = (text) => {
    return text
      .replace(/\*/g, "")
      .replace(/_/g, "")
      .replace(/\n+/g, "\n")
      .replace(/\n/g, "\n\n")
      .trim();
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    setLoading(true);
    const userMessage = { text: userInput, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = userMessage.text;

    currentGeneration.current = model.generateContent(prompt);
    const result = await currentGeneration.current;
    const response = result.response;

    const cleanResponseText = cleanText(response.text());
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: cleanResponseText, user: false },
    ]);
    setLoading(false);
    setUserInput("");
  };

  const stopGeneration = () => {
    if (currentGeneration.current) {
      currentGeneration.current.cancel();
      setShowStopIcon(false);
      setLoading(false);
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.user ? styles.userMessageContainer : styles.botMessageContainer,
      ]}
    >
      {!item.user && (
        <Image
          source={require("../assets/chatbot.png")}
          style={styles.botAvatar}
        />
      )}
      <Text style={[styles.messageText, item.user && styles.userMessage]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Escribe algo..."
              onChangeText={setUserInput}
              value={userInput}
              onSubmitEditing={sendMessage}
              style={styles.input}
              placeholderTextColor="black"
            />
            {showStopIcon && (
              <TouchableOpacity
                style={styles.stopIcon}
                onPress={stopGeneration}
              >
                <Entypo name="controller-stop" size={24} color="white" />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                styles.inputButton,
                userInput.trim()
                  ? styles.inputButtonEnabled
                  : styles.inputButtonDisabled,
              ]}
              onPress={sendMessage}
              disabled={!userInput.trim()}
            >
              <Text style={styles.inputButtonText}>Enviar</Text>
              <FontAwesome name="send" size={16} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.footerContainer}>
            <FooterMenu navigation={navigation} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  messageContainer: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  userMessageContainer: {
    backgroundColor: "#B7D2BF",
    alignSelf: "flex-end",
  },
  botMessageContainer: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    marginLeft: 60, // Aumenta el margen para que haya espacio para el avatar
  },
  botAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    left: -50, // Ajuste de la posición izquierda
    top: -5, // Alineación vertical del avatar
  },
  messageText: {
    fontSize: 16,
    color: "#1B4332",
    flexShrink: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 11,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 85,
    marginLeft: 9.5,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#B7D2BF",
    borderRadius: 15,
    height: 50,
    color: "black",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  stopIcon: {
    padding: 10,
    backgroundColor: "#40916C",
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 3,
  },
  inputButton: {
    backgroundColor: "#B7D2BF",
    borderRadius: 15,
    padding: 10,
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    height: 51,
    width: 90,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  inputButtonEnabled: {
    backgroundColor: "#79B47C",
  },
  inputButtonDisabled: {
    backgroundColor: "#D9D9D9",
  },
  inputButtonText: {
    color: "black",
    fontSize: 14,
    marginRight: 4,
    fontWeight: 'bold',
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
  },
});

export default GeminiChat;
