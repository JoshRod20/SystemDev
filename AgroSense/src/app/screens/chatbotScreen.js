import React, { useState, useEffect } from "react"; 
import * as GoogleGenerativeAI from "@google/generative-ai";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Speech from "expo-speech";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showStopIcon, setShowStopIcon] = useState(false);

  const API_KEY = "AIzaSyBJgX0m30ywz52zLZ8FCWDHXolrWeJ-PSQ";

  useEffect(() => {
    const startChat = async () => {
      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = "¡Hola! Bienvenido al ChatBot AgroSense, ¿en qué puedo ayudarte hoy?";
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = cleanText(response.text());
      console.log(text);
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

  // Función para limpiar caracteres no deseados
  const cleanText = (text) => {
    return text
      .replace(/\*/g, "") // Remover asteriscos
      .replace(/_/g, "") // Remover guiones bajos
      .replace(/\n+/g, "\n") // Limpiar saltos de línea extra
      .trim(); // Eliminar espacios en blanco al inicio y final
  };

  const sendMessage = async () => {
    setLoading(true);
    const userMessage = { text: userInput, user: true };
    setMessages([...messages, userMessage]);

    const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = userMessage.text;
    const result = await model.generateContent(prompt);
    const response = result.response;
    
    const cleanResponseText = cleanText(response.text());
    setMessages([...messages, { text: cleanResponseText, user: false }]);
    setLoading(false);
    setUserInput("");

    if (cleanResponseText && !isSpeaking) {
      setIsSpeaking(true);
      setShowStopIcon(true);
    }
  };

  const toggleSpeech = () => {
    console.log("isSpeaking", isSpeaking);
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      Speech.speak(messages[messages.length - 1].text);
      setIsSpeaking(true);
    }
  };

  const ClearMessage = () => {
    setMessages("");
    setIsSpeaking(false);
  };

  const renderMessage = ({ item }) => (
    <View style={styles.messageContainer}>
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
        keyExtractor={(item) => item.text}
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.micIcon} onPress={toggleSpeech}>
          {isSpeaking ? (
            <FontAwesome
              name="microphone-slash"
              size={24}
              color="white"
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          ) : (
            <FontAwesome
              name="microphone"
              size={24}
              color="white"
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          )}
        </TouchableOpacity>
        <TextInput
          placeholder="Escribe algo..."
          onChangeText={setUserInput}
          value={userInput}
          onSubmitEditing={sendMessage}
          style={styles.input}
          placeholderTextColor="#fff"
        />
        {showStopIcon && (
          <TouchableOpacity style={styles.stopIcon} onPress={ClearMessage}>
            <Entypo name="controller-stop" size={24} color="white" />
          </TouchableOpacity>
        )}
        {/* Botón para enviar el mensaje */}
        <TouchableOpacity style={styles.inputButton} onPress={sendMessage}>
          <Text style={styles.inputButtonText}></Text>
          <FontAwesome name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8F3DC",  // Fondo verde claro
  },
  header: {
    backgroundColor: "#95D5B2", // Verde más oscuro para la cabecera
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  messageContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    alignSelf: "flex-start",
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#B7E4C7",  // Mensaje del usuario con fondo verde claro
  },
  messageText: {
    fontSize: 16,
    color: "#1B4332",  // Color del texto
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#B7E4C7",  // Fondo verde claro del input
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#40916C",  // Fondo verde oscuro del campo de entrada
    borderRadius: 20,
    height: 50,
    color: "white",
  },
  micIcon: {
    padding: 10,
    backgroundColor: "#40916C",  // Fondo verde oscuro del ícono de micrófono
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  stopIcon: {
    padding: 10,
    backgroundColor: "#40916C",  // Fondo verde oscuro del ícono de detener
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 3,
  },
  inputButton: {
    backgroundColor: "#74C69D",  // Fondo verde suave para el botón
    borderRadius: 20,
    padding: 15,
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  inputButtonText: {
    color: "black",
    fontSize: 16,
    marginRight: 5,
  },
});

export default GeminiChat;
