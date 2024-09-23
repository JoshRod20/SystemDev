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
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showStopIcon, setShowStopIcon] = useState(false);
  const currentGeneration = useRef(null);

  const API_KEY = "AIzaSyDvXtfYrTjnq9FU-6aPNk9ahItFTtyKpZo";

  useEffect(() => {
    const startChat = async () => {
      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = "¡Hola! Bienvenido al ChatBot AgroSense, ¿en qué puedo ayudarte hoy?";
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = cleanText(response.text());
      showMessage({
        message: "Bienvenido al ChatBot AgroSense 🤖",
        description: text,
        type: "info",
        icon: "info",
        duration: 2000,
      });
      setMessages([
        {
          text,
          user: false,
        },
      ]);
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
    setMessages((prevMessages) => [...prevMessages, { text: cleanResponseText, user: false }]);
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
          source={require('../assets/chatbot.png')}
          style={styles.botAvatar}
        />
      )}
      <Text style={[styles.messageText, item.user && styles.userMessage]}>
        {item.text}
      </Text>
    </View>
  );

  return (
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
          placeholderTextColor="#fff"
        />
        {showStopIcon && (
          <TouchableOpacity style={styles.stopIcon} onPress={stopGeneration}>
            <Entypo name="controller-stop" size={24} color="white" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.inputButton,
            userInput.trim() ? styles.inputButtonEnabled : styles.inputButtonDisabled,
          ]}
          onPress={sendMessage}
          disabled={!userInput.trim()}
        >
          <Text style={styles.inputButtonText}>Enviar</Text>
          <FontAwesome name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(188, 234, 187, 0.5)",
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
    backgroundColor: "#BCEABB",
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
    padding: 10,
    backgroundColor: "#B7E4C7",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#40916C",
    borderRadius: 20,
    height: 50,
    color: "white",
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
    backgroundColor: "#74C69D",
    borderRadius: 20,
    padding: 15,
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  inputButtonEnabled: {
    backgroundColor: "#52B788",
  },
  inputButtonDisabled: {
    backgroundColor: "#A8DADC",
  },
  inputButtonText: {
    color: "black",
    fontSize: 16,
    marginRight: 5,
  },
});

export default GeminiChat;
