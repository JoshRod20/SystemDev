import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FooterMenu from '../components/footerMenu';

const CropAdvice = ({navigation}) => {
  return (
    <View style={styles.container}>
        <FooterMenu navigation={navigation} />
        <Text style={styles.title}>Consejo de cultivos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    title: {
        paddingTop: 40,
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft:10,
    }
});

export default CropAdvice;