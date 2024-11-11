import React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CultivoDetailScreen = ({ route }) => {
  const { cultivo } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cultivo.nombre}</Text>
      <Text style={styles.date}>Fecha de siembra: {cultivo.fecha}</Text>
      <Text style={styles.etapa}>Etapa de crecimiento: {cultivo.estado}</Text>
      <Image source={{ uri: cultivo.imagen }} style={styles.image} />
    </View>
  );
};  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  etapa: {
    fontSize: 16,
    marginBottom: 8,
  },
  estado: {
    fontSize: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    textAlign: "center",
    marginBottom: 16,
  },
  completo: {
    backgroundColor: "#D4EDDA",
    color: "#155724",
  },
  incompleto: {
    backgroundColor: "#F8D7DA",
    color: "#721C24",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 16,
  },
});

export default CultivoDetailScreen;