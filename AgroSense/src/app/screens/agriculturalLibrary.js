import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import FooterMenu from "../components/footerMenu";
import Library from "../components/library";

const AgriculturalLibrary = ({ navigation }) => {
  const [showFooter, setShowFooter] = useState(true);
  const previousScrollOffset = useRef(0);

  const handleScroll = (event) => {
    const currentScrollOffset = event.nativeEvent.contentOffset.y;

    // Mantener el footer visible al inicio del contenido
    if (currentScrollOffset <= 0) {
      setShowFooter(true);
    } else if (currentScrollOffset < previousScrollOffset.current) {
      // Mostrar el footer cuando el usuario se desplaza hacia arriba
      setShowFooter(true);
    } else {
      // Ocultar el footer cuando el usuario se desplaza hacia abajo
      setShowFooter(false);
    }

    previousScrollOffset.current = currentScrollOffset;
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Aquí puedes encontrar la información que buscas sobre el cuidado de
          tus cultivos
        </Text>
      </View>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16} // Actualiza con frecuencia el evento de desplazamiento
      >
        <Library
          picture={require("../assets/trigo-icono-de-cultivo-__1_-removebg-preview.png")}
          info="El cultivo de trigo, necesita la mayor cantidad de agua durante la fase de floración, con una media de 0.5cm al día... "
        />
        <Library
          picture={require("../assets/caf--icono-de-cultivo--removebg-preview.png")}
          info="El café es una de las bebidas más populares. Sin embargo, detrás de cada taza de café se encuentra un proceso de cultivo que requiere cuidado y atención constantes... "
        />
        <Library
          picture={require("../assets/frijoles-icono-de-cultivo__1_-removebg-preview.png")}
          info="La planta de frijol es muy suceptible a condiciones extremas; exceso o falta de humedad, por tal razón debe... "
        />
        <Library
          picture={require("../assets/icono-de-citricos--removebg-preview.png")}
          info="Dependiendo del tipo de árbol que hayamos establecido, vamos a tener el tiempo de cosecha, siendo de 5 a 7 años en la mayoría de especies cítricas... "
        />
        <Library
          picture={require("../assets/icon Maiz.png")}
          info="El maíz es el cereal más producido en el mundo, por lo que se destaca de otros cultivos. En los últimos 50 años, la producción de este grano ha ido en aumento... "
        />
        <Library
          picture={require("../assets/icon Arroz.png")}
          info="Durante las últimas décadas, la producción de arroz ha crecido significativamente gracias a avances en la tecnología agrícola y métodos de cultivo... "
        />
      </ScrollView>
      {showFooter && <FooterMenu navigation={navigation} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textContainer: {
    marginTop: 5,
    marginLeft: 23,
    justifyContent: "center",
    backgroundColor: "#B7D2BF",
    borderRadius: 17,
    height: 50,
    width: "89%",
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default AgriculturalLibrary;
