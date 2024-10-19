import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const FertilizerCalculator = () => {
  const [crop, setCrop] = useState("Arroz");
  const [unit, setUnit] = useState("Hectárea");
  const [area, setArea] = useState(1);
  const [result, setResult] = useState(null);

  const calculateFertilizers = () => {
    const fertilizers = {
      MOP: 58,
      SSP: 150,
      Urea: 163,
    };
    setResult(fertilizers);
  };

  return (
    <View style={styles.container}>
      {/* Selección de Cultivo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Ver información relevante sobre:
        </Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={crop}
            onValueChange={(itemValue) => setCrop(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Arroz" value="Arroz" />
            <Picker.Item label="Maíz" value="Maíz" />
            <Picker.Item label="Frijol" value="Frijol" />
            <Picker.Item label="Café" value="Café" />
            <Picker.Item label="Trigo" value="Trigo" />
          </Picker>
        </View>
      </View>

      {/* Unidades */}
      <Text style={styles.sectionTitle}>Unidades</Text>
      <View style={styles.unitsContainer}>
        {["Acre", "Hectárea", "Manzana"].map((u) => (
          <TouchableOpacity
            key={u}
            onPress={() => setUnit(u)}
            style={[
              styles.unitButton,
              { backgroundColor: unit === u ? "#4A6B3E" : "#9C9696" },
            ]}
          >
            <Text style={styles.unitButtonText}>{u}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tamaño de la Parcela */}
      <Text style={styles.sectionTitle}>Tamaño de la parcela</Text>
      <View style={styles.areaContainer}>
        <TouchableOpacity
          style={styles.areaButton}
          onPress={() => setArea(area > 0.1 ? area - 0.1 : 0)}
        >
          <Text style={styles.areaButtonText}>-</Text>
        </TouchableOpacity>
        <TextInput
          value={String(area)}
          keyboardType="numeric"
          onChangeText={(text) => setArea(parseFloat(text))}
          style={styles.areaInput}
        />
        <TouchableOpacity
          style={styles.areaButton}
          onPress={() => setArea(area + 0.1)}
        >
          <Text style={styles.areaButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Botón de Cálculo */}
      <TouchableOpacity
        style={styles.calculateButton}
        onPress={calculateFertilizers}
      >
        <Text style={styles.calculateButtonText}>Calcular</Text>
      </TouchableOpacity>

      {/* Resultados */}
      {result && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultText}>MOP: {result.MOP}Kg</Text>
          <Text style={styles.resultText}>SSP: {result.SSP}Kg</Text>
          <Text style={styles.resultText}>Urea: {result.Urea}Kg</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A6B3E",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    marginBottom: 5,
  },
  pickerContainer: {
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
  },
  picker: {
    height: 50,
    color: "#000",
  },
  unitsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  unitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  unitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  areaContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  areaButton: {
    padding: 10,
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
  },
  areaButtonText: {
    fontSize: 24,
    color: "#4A6B3E",
    width: 40,
    height: 40,
    textAlign: "center",
  },
  areaInput: {
    marginHorizontal: 10,
    fontSize: 18,
    textAlign: "center",
    width: 60,
    height: 40,
    borderRadius: 8,
    borderColor: "#4A6B3E",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  calculateButton: {
    backgroundColor: "#4A6B3E",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  calculateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultsContainer: {
    backgroundColor: "#E5E5E5",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  resultText: {
    fontSize: 16,
    color: "#4A6B3E",
    marginBottom: 10,
  },
});

export default FertilizerCalculator;

