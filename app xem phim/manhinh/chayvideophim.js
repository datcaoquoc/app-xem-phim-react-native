import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { Video } from 'expo-av';
export default function manhinhchao({ navigation , route}) {
  const [taikhoan, setTaikhoan] = useState('');
  const [matkhau, setMatkhau] = useState('');

  return (
    <View style={styles.container}>
     <Video 
    
  source={{ uri: route.params.videophim }}
  rate={1.0}
  volume={1.0}
  isMuted={false}
  resizeMode="cover"
  useNativeControls={true}
  shouldPlay
  isLooping
  style={{ width: '100%', height: 300 }}
/>
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
  backgroundVideo: {
  flex:1
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