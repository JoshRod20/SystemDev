import { StyleSheet, View, Dimensions, ScrollView, Alert, Text } from 'react-native';
import { ContributionGraph } from "react-native-chart-kit";

export default function GraficoReporteEnfermedades({ dataReporteEnfermedades }) {

  const screenWidth = Dimensions.get("window").width;
  const squareSize = 30;
  const numDays = 365;

  const getMonthLabel = (monthIndex) => {
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return months[monthIndex];
  };

  const handleDayPress = (day) => {
    Alert.alert(`Reportes`, `Fecha: ${day.date}\nCantidad: ${day.count}`);
  };

  // Verificamos si los datos están disponibles y son un array
  if (!Array.isArray(dataReporteEnfermedades) || dataReporteEnfermedades.length === 0) {
    return <Text style={styles.errorText}>No hay datos disponibles para mostrar el gráfico.</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <ContributionGraph
          values={dataReporteEnfermedades}
          endDate={new Date("2017-12-30")}
          numDays={numDays}
          width={1680}
          height={300}
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#f0f0f0",
            backgroundGradientTo: "#f0f0f0",
            color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
            strokeWidth: 2,
          }}
          gutterSize={0.4}
          bgColor={"transparent"}
          squareSize={squareSize}
          getMonthLabel={getMonthLabel}
          onDayPress={handleDayPress}
          style={{
            borderRadius: 10,
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
