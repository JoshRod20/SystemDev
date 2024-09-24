import React from 'react';
import { View, StyleSheet } from 'react-native';
import FooterMenu from '../components/footerMenu';

const TheirCrops = ({navigation}) => {
  return (
    <View style={styles.container}>
        <FooterMenu navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
});

export default TheirCrops;