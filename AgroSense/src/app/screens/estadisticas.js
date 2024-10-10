import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import PrecioMercado from '../components/precioMercado';
import { collection, getDocs, query } from 'firebase/firestore';


//Importación de conexión a firebase
import { db } from '../services/firebase'

export default function Estadisticas() {

  const [bandera, setBandera] = useState(false); // Variable bandera
  const [dataPrecioMercado, setDataPrecioMercado] = useState({
    labels: [],
    datasets: [{ data: [] }] // Inicializa datasets como un array con un objeto
  });

  // Carga de datos de tipos de sangre
  useEffect(() => {
    const recibirDatosPrecioMercado = async () => {
      try {
        const q = query(collection(db, "precios_mercado"));
        const querySnapshot = await getDocs(q);
        const tipos_granos = [];
        const precios_quintales = [];

        querySnapshot.forEach((doc) => {
          const datosBD = doc.data();
          const { tipo_grano, precio_quintal } = datosBD;
            tipos_granos.push(tipo_grano); // Agrega nombre a la lista
            precios_quintales.push(precio_quintal); // Agrega salario a la lista

        });

        // Actualiza el estado con el formato requerido
        setDataPrecioMercado({
          labels: tipos_granos,
          datasets: [{ data: precios_quintales }]
        });

        console.log({ labels: tipos_granos, datasets: [{ data: precios_quintales }] });
      } catch (error) {
        console.error("Error al obtener documentos: ", error);
      }
    };

    recibirDatosPrecioMercado();
  }, [bandera]);

  
  //Llamado de componentes
  return (
    <View style={styles.container} >

        <PrecioMercado dataPrecioMercado={dataPrecioMercado}/>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  scrollView: {
    padding: 10,
  },
  graphContainer: {
    marginTop: 10,
    padding: 10,
  },
});
