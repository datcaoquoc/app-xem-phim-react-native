import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
export default function manhinhchao({ navigation }) {
  const [taikhoan, setTaikhoan] = useState('');
  const [matkhau, setMatkhau] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.phandaugt}>
        <Animatable.Image animation='zoomInDown' onAnimationEnd={() => navigation.navigate('mhdangnhap')} duration={3000} style={styles.logo} source={require('../hinhanh/logo.png')}></Animatable.Image>
    </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1919',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phandaugt: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 150,
    resizeMode: 'stretch'
  },
});