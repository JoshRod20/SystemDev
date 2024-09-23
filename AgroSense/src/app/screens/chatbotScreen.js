import React, { useState, useEffect, useRef } from "react";
import * as GoogleGenerativeAI from "@google/generative-ai";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showStopIcon, setShowStopIcon] = useState(false);
  const currentGeneration = useRef(null);  // Para almacenar la referencia de la generación actual

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

  // Función para limpiar caracteres no deseados y agregar saltos de línea
  const cleanText = (text) => {
    return text
      .replace(/\*/g, "") // Remover asteriscos
      .replace(/_/g, "") // Remover guiones bajos
      .replace(/\n+/g, "\n") // Limpiar saltos de línea extra
      .replace(/\n/g, "\n\n") // Agregar doble salto para separación de párrafos
      .trim(); // Eliminar espacios en blanco al inicio y final
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return; // No hacer nada si el input está vacío
    setLoading(true);
    const userMessage = { text: userInput, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = userMessage.text;

    currentGeneration.current = model.generateContent(prompt); // Guardamos la generación actual
    const result = await currentGeneration.current;
    const response = result.response;

    const cleanResponseText = cleanText(response.text());
    setMessages((prevMessages) => [...prevMessages, { text: cleanResponseText, user: false }]);
    setLoading(false);
    setUserInput(""); // Limpiar el campo de entrada después de enviar el mensaje
  };

  // Función para detener la generación actual
  const stopGeneration = () => {
    if (currentGeneration.current) {
      currentGeneration.current.cancel(); // Cancelar la generación en curso
      setShowStopIcon(false);  // Ocultar el botón de detener
      setLoading(false);  // Detener el estado de carga
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.user ? styles.userMessageContainer : styles.botMessageContainer,
      ]}
    >
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
        {/* Botón para enviar el mensaje */}
        <TouchableOpacity
          style={[
            styles.inputButton,
            userInput.trim() ? styles.inputButtonEnabled : styles.inputButtonDisabled,
          ]}
          onPress={sendMessage}
          disabled={!userInput.trim()}  // Deshabilitar el botón si el input está vacío
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
    backgroundColor: "#D8F3DC",  // Fondo verde claro
  },
  messageContainer: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  userMessageContainer: {
    backgroundColor: "#74C69D",  // Fondo verde claro para el mensaje del usuario
    alignSelf: "flex-end",  // Mensaje del usuario alineado a la derecha
  },
  botMessageContainer: {
    backgroundColor: "#FFFFFF",  // Fondo blanco para el mensaje del bot
    alignSelf: "flex-start",  // Mensaje del bot alineado a la izquierda
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
  inputButtonEnabled: {
    backgroundColor: "#52B788",  // Fondo verde más fuerte cuando el botón está habilitado
  },
  inputButtonDisabled: {
    backgroundColor: "#A8DADC",  // Color más apagado cuando está deshabilitado
  },
  inputButtonText: {
    color: "black",
    fontSize: 16,
    marginRight: 5,
  },
});

export default GeminiChat;
