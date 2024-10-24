import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView,   Platform, } from "react-native";
import FooterMenu from "../components/footerMenu";

const AgriculturalLibrary = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FooterMenu navigation={navigation} />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default AgriculturalLibrary;
