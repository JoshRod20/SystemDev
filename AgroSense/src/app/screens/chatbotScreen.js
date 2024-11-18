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
import { FontAwesome, Entypo, MaterialIcons } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showStopIcon, setShowStopIcon] = useState(false);
  const currentGeneration = useRef(null);
  const navigation = useNavigation();
  const [isTyping, setIsTyping] = useState(false); // Nuevo estado para controlar si el bot está escribiendo

  const API_KEY = "AIzaSyDvXtfYrTjnq9FU-6aPNk9ahItFTtyKpZo";

  useEffect(() => {
    const startChat = async () => {
      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const initialMessage = "¡Hola! Bienvenido, soy Agri, tu asistente de AgroSense. ¿En qué puedo ayudarte hoy?";
      setMessages([{ text: initialMessage, user: false }]);

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
    return text.replace(/\*/g, "")
      .replace(/_/g, "")
      .replace(/\n+/g, "\n")
      .replace(/\n/g, "\n\n")
      .trim();
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return; // Si no hay texto, no se envía

    setLoading(true);
    const userMessage = { text: userInput, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput(""); // Limpiar el input inmediatamente

    setIsTyping(true); // Indicar que el bot está escribiendo

    const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    currentGeneration.current = model.generateContent(userMessage.text);
    
    // Simular un tiempo de espera para que el bot "escriba"
    setTimeout(async () => {
      const result = await currentGeneration.current;
      const response = result.response;
      const cleanResponseText = cleanText(response.text());

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: cleanResponseText, user: false },
      ]);
      setIsTyping(false); // Indicar que el bot ha terminado de "escribir"
      setLoading(false);
    }, 1000); // Ajusta el tiempo como consideres necesario
  };

  const stopGeneration = () => {
    if (currentGeneration.current) {
      currentGeneration.current.cancel();
      setShowStopIcon(false);
      setLoading(false);
    }
  };

  const startNewChat = () => {
    const initialMessage = "¡Hola! Bienvenido, soy Agri, tu asistente de AgroSense. ¿En qué puedo ayudarte hoy?";
    setMessages([{ text: initialMessage, user: false }]);
    setUserInput(""); // Limpiar el input

    showMessage({
      message: "Nuevo chat iniciado 🤖",
      description: initialMessage,
      type: "info",
      icon: "info",
      duration: 2000,
    });
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.user ? styles.userMessageContainer : styles.botMessageContainer]}>
      {!item.user && (
        <Image source={require("../assets/chatbot.png")} style={styles.botAvatar} />
      )}
      <Text style={[styles.messageText, item.user && styles.userMessage]}>
        {item.text}
      </Text>
    </View>
  );

  const renderTypingIndicator = () => (
    isTyping && (
      <View style={[styles.messageContainer, styles.botMessageContainer]}>
        <Image source={require("../assets/chatbot.png")} style={styles.botAvatar} />
        <Text style={styles.messageText}>Agri está escribiendo...</Text>
      </View>
    )
  );


  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={renderTypingIndicator} // Agregar el indicador de escritura al final de la lista
          />
          <View style={styles.newChat}>
            <TouchableOpacity style={styles.newChatButton} onPress={startNewChat}>
              <MaterialIcons name="refresh" size={24} color="#1B4332" />
            </TouchableOpacity>
          </View>

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
              <TouchableOpacity style={styles.stopIcon} onPress={stopGeneration}>
                <Entypo name="controller-stop" size={24} color="white" />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.inputButton, userInput.trim() ? styles.inputButtonEnabled : styles.inputButtonDisabled]}
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
  },
  userMessageContainer: {
    backgroundColor: "#B7D2BF",
    alignSelf: "flex-end",
  },
  botMessageContainer: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    marginLeft: 60,
  },
  botAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    left: -50,
    top: -5,
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
    paddingBottom: 90,
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
    fontWeight: "bold",
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
  },
  newChatButton: {
    backgroundColor: "#B7D2BF",
    alignItems: 'center',
    padding: 7,
    borderRadius: 20,
    width: 40,
    height: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  newChat: {
    paddingLeft: 20,
  },
  stopIcon: {
    backgroundColor: "#D03F3F",
    borderRadius: 50,
    padding: 5,
    marginRight: 5,
  },
});

export default GeminiChat;
