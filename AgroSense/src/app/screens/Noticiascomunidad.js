import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const NoticiasIPSA = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Noticias de la comunidad - IPSA</Text>
      <View style={styles.newsItem}>
        <Text style={styles.newsTitle}>Noticia 1</Text>
        <Text style={styles.newsDescription}>
          Descripción de la noticia 1 sobre el trabajo del IPSA en Nicaragua...
        </Text>
      </View>
      <View style={styles.newsItem}>
        <Text style={styles.newsTitle}>Noticia 2</Text>
        <Text style={styles.newsDescription}>
          Descripción de la noticia 2 sobre avances en el control de plagas...
        </Text>
      </View>
      <View style={styles.newsItem}>
        <Text style={styles.newsTitle}>Noticia 3</Text>
        <Text style={styles.newsDescription}>
          Descripción de la noticia 3 relacionada con la agricultura...
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  newsItem: {
    marginBottom: 20,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  newsDescription: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default NoticiasIPSA;
