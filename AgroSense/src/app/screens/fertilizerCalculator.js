import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native-gesture-handler";

const FertilizerCalculator = () => {
  const [crop, setCrop] = useState("Arroz");
  const [unit, setUnit] = useState("Hectárea");
  const [area, setArea] = useState(1);
  const [fertilizerResult, setFertilizerResult] = useState(null);
  const [pesticideResult, setPesticideResult] = useState(null);

  const fertilizersPerUnit = {
    Arroz: {
      Hectárea: { MOP: 60, SSP: 150, Urea: 100 },
      Acre: { MOP: 24, SSP: 61, Urea: 40 },
      Manzana: { MOP: 85, SSP: 213, Urea: 142 },
    },
    Maíz: {
      Hectárea: { MOP: 50, SSP: 120, Urea: 90 },
      Acre: { MOP: 20, SSP: 49, Urea: 36 },
      Manzana: { MOP: 70, SSP: 170, Urea: 106 },
    },
    Frijol: {
      Hectárea: { MOP: 40, SSP: 100, Urea: 80 },
      Acre: { MOP: 16, SSP: 41, Urea: 32 },
      Manzana: { MOP: 60, SSP: 140, Urea: 106 },
    },
    Café: {
      Hectárea: { MOP: 70, SSP: 180, Urea: 120 },
      Acre: { MOP: 28, SSP: 73, Urea: 48 },
      Manzana: { MOP: 100, SSP: 255, Urea: 170 },
    },
    Trigo: {
      Hectárea: { MOP: 55, SSP: 140, Urea: 110 },
      Acre: { MOP: 22, SSP: 57, Urea: 44 },
      Manzana: { MOP: 78, SSP: 199, Urea: 155 },
    },
  };

  const pesticidesPerUnit = {
    Arroz: {
      Hectárea: { Insecticida: 5, Fungicida: 7 },
      Acre: { Insecticida: 2, Fungicida: 2.8 },
      Manzana: { Insecticida: 7.5, Fungicida: 10.5 },
    },
    Maíz: {
      Hectárea: { Insecticida: 6, Fungicida: 8 },
      Acre: { Insecticida: 2.4, Fungicida: 3.2 },
      Manzana: { Insecticida: 9, Fungicida: 12 },
    },
    Frijol: {
      Hectárea: { Insecticida: 4, Fungicida: 6 },
      Acre: { Insecticida: 1.6, Fungicida: 2.4 },
      Manzana: { Insecticida: 6, Fungicida: 9 },
    },
    Café: {
      Hectárea: { Insecticida: 8, Fungicida: 10 },
      Acre: { Insecticida: 3.2, Fungicida: 4 },
      Manzana: { Insecticida: 12, Fungicida: 15 },
    },
    Trigo: {
      Hectárea: { Insecticida: 5, Fungicida: 7 },
      Acre: { Insecticida: 2, Fungicida: 2.8 },
      Manzana: { Insecticida: 7.5, Fungicida: 10.5 },
    },
  };

  const calculateFertilizers = () => {
    const fertilizers = fertilizersPerUnit[crop][unit];
    const adjustedFertilizers = {
      MOP: (fertilizers.MOP * area).toFixed(2),
      SSP: (fertilizers.SSP * area).toFixed(2),
      Urea: (fertilizers.Urea * area).toFixed(2),
    };
    setFertilizerResult(adjustedFertilizers);
  };

  const calculatePesticides = () => {
    const pesticides = pesticidesPerUnit[crop][unit];
    const adjustedPesticides = {
      Insecticida: (pesticides.Insecticida * area).toFixed(2),
      Fungicida: (pesticides.Fungicida * area).toFixed(2),
    };
    setPesticideResult(adjustedPesticides);
  };

  return (
    <ScrollView>
          <View style={styles.container}>
      {/* Selección de Cultivo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ver información relevante sobre:</Text>
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
          onPress={() => setArea((prevArea) => Math.max(prevArea - 1, 0))}
        >
          <Text style={styles.areaButtonText}>-</Text>
        </TouchableOpacity>
        <TextInput
          value={String(area)}
          keyboardType="numeric"
          onChangeText={(text) => {
            const value = parseFloat(text);
            setArea(isNaN(value) || value < 0 ? 0 : value); // Valida valores no válidos
          }}
          style={styles.areaInput}
        />
        <TouchableOpacity
          style={styles.areaButton}
          onPress={() => setArea((prevArea) => parseFloat((prevArea + 0.1).toFixed(1)))}
        >
          <Text style={styles.areaButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Botones de Cálculo */}
      <TouchableOpacity style={styles.calculateButton} onPress={calculateFertilizers}>
        <Text style={styles.calculateButtonText}>Calcular Fertilizantes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.calculateButton} onPress={calculatePesticides}>
        <Text style={styles.calculateButtonText}>Calcular Plaguicidas</Text>
      </TouchableOpacity>

      {/* Resultados de Fertilizantes */}
      {fertilizerResult && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultText}>Fertilizantes:</Text>
          <Text style={styles.resultText}>MOP: {fertilizerResult.MOP} Kg</Text>
          <Text style={styles.resultText}>SSP: {fertilizerResult.SSP} Kg</Text>
          <Text style={styles.resultText}>Urea: {fertilizerResult.Urea} Kg</Text>
        </View>
      )}

      {/* Resultados de Plaguicidas */}
      {pesticideResult && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultText}>Plaguicidas:</Text>
          <Text style={styles.resultText}>Insecticida: {pesticideResult.Insecticida} L</Text>
          <Text style={styles.resultText}>Fungicida: {pesticideResult.Fungicida} L</Text>
        </View>
      )}
    </View>
    </ScrollView>
  );
};

// Estilos
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
    fontSize: 18,
    color: "#4A6B3E",
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default FertilizerCalculator;
