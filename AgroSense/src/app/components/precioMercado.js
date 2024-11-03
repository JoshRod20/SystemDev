import { StyleSheet, View, Dimensions } from 'react-native';
import { BarChart } from "react-native-chart-kit";

const PrecioMercado = ({ dataPrecioMercado }) => {
  let screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <BarChart
        data={dataPrecioMercado}
        width={screenWidth - (screenWidth * 0.1)}
        height={300}
        chartConfig={{
            backgroundGradientFrom: "rgba(74, 107, 62, 0.3)", // Verde oscuro con transparencia
            backgroundGradientFromOpacity: 0.1,
            backgroundGradientTo: "rgba(166, 204, 111, 0.3)", // Verde más claro con transparencia
            backgroundGradientToOpacity: 0.3,
            color: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`, // Verde intenso para los datos
            strokeWidth: 2,
            barPercentage: 0.5,
            fillShadowGradient: "#81B622", // Verde lima para las barras
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
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
  },
});

export default PrecioMercado;
