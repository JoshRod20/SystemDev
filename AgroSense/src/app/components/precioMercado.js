import React, { useRef } from 'react';
import { View, Alert, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { jsPDF } from 'jspdf';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';
import { BarChart } from 'react-native-chart-kit';

const PrecioMercado = ({ dataPrecioMercado }) => {
  const chartRef = useRef(); // Referencia al gráfico
  const screenWidth = Dimensions.get('window').width;

  const generarPDF = async () => {
    try {
      // Capturar el gráfico como imagen con una calidad aún más alta
      const uri = await captureRef(chartRef, {
        format: 'png',
        quality: 1, // Máxima calidad
        width: screenWidth * 3, // Multiplicado por 3 para mayor resolución
        height: 900, // Altura también multiplicada por 3
      });

      // Crear el PDF
      const doc = new jsPDF();
      doc.text('Reporte de Precios de Mercado', 10, 10);

      // Leer la imagen capturada y agregarla al PDF
      const chartImage = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      // Ajustar las dimensiones de la imagen en el PDF
      doc.addImage(`data:image/png;base64,${chartImage}`, 'PNG', 10, 20, 190, 150, undefined, 'FAST');

      // Agregar datos de texto al PDF
      dataPrecioMercado.labels.forEach((label, index) => {
        const precio = dataPrecioMercado.datasets[0].data[index];
        doc.text(`${label}: C$${precio}`, 10, 180 + index * 10);
      });

      // Guardar y compartir el PDF
      const pdfBase64 = doc.output('datauristring').split(',')[1];
      const fileUri = `${FileSystem.documentDirectory}reporte_precios_mercado.pdf`;

      await FileSystem.writeAsStringAsync(fileUri, pdfBase64, {
        encoding: FileSystem.EncodingType.Base64,
      });
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error('Error al generar o compartir el PDF: ', error);
      Alert.alert('Error', 'No se pudo generar o compartir el PDF.');
    }
  };

  return (
    <View style={styles.container}>
      <View ref={chartRef} collapsable={false} style={styles.chartContainer}>
        <BarChart
          data={dataPrecioMercado}
          width={screenWidth - screenWidth * 0.1}
          height={370}
          chartConfig={{
            backgroundGradientFrom: 'rgba(74, 107, 62, 0.3)', // Verde oscuro con transparencia
            backgroundGradientFromOpacity: 0.1,
            backgroundGradientTo: 'rgba(166, 204, 111, 0.3)', // Verde más claro con transparencia
            backgroundGradientToOpacity: 0.3,
            color: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`, // Verde intenso para los datos
            strokeWidth: 2,
            barPercentage: 0.5,
            fillShadowGradient: '#81B622', // Verde lima para las barras
            fillShadowGradientOpacity: 1,
          }}
          style={{
            borderRadius: 10,
          }}
          verticalLabelRotation={45}
          withHorizontalLabels={true}
          showValuesOnTopOfBars={true}
        />
      </View>

      <View style={styles.button}>
        <TouchableOpacity style={styles.buttonStyle} onPress={generarPDF}>
          <Text style={styles.buttonText}>Generar y Compartir PDF</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonStyle: {
    backgroundColor: '#81B622',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PrecioMercado;
