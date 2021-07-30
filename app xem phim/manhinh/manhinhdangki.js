import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, Image, TextInput,Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { useQuery, useMutation } from '@apollo/client'
import AppLoading from 'expo-app-loading'
import { THEM_USER } from '../truyvan/truyvangraphql'

export default function manhinhdangnhap({ navigation }) {
  const [taouser] = useMutation(THEM_USER);
  const [tk, setTk] = useState('');
  const [mk, setMk] = useState('');
  const [nhaplaimatkhau, setNhaplaimatkhau] = useState('');
  const [em, setEm] = useState('');

  const Validatedangki = () => {
    if(mk == '' && tk == '' && em == ''){
      alert("Hãy điền đầy đủ thông tin của bạn !");
      return false;
    }
    if(tk.length <= 5) {
      alert("Tên tài khoản phải trên 5 kí tự !");
      return false;
    }
    let parenemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (parenemail.test(em) === false) {
      alert("Email không hợp lệ !!  EX:@gmail.com");
      return false;
    }
    if(mk == ""){
      alert("Hãy nhập mật khẩu của bạn");
      return false;
    }
    if(mk !== nhaplaimatkhau){
      alert("Mật khẩu bạn nhập lại chưa khớp !");
      return false;
    }
    if(tk.length > 5 && mk == nhaplaimatkhau && parenemail.test(em) === true){
      taouser({variables: {taikhoan: tk, matkhau: mk, email: em}})
      Alert.alert(
        ' 🔔 THÔNG BÁO 🔔',
        'Đăng kí thành công, Bạn có muốn quay lại trang chủ',
  
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          { text: 'OK', onPress: () =>  {navigation.navigate('mhdangnhap')}}
        ],
        { cancelable: false },
        {backgroundColor: 'red'}
      )
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.phandaugt}>
        <Animatable.Image animation='rubberBand' iterationCount='infinite' delay={2000} duration={3000} style={styles.logo} source={require('../hinhanh/logo.png')}></Animatable.Image>
      </View>
      <Animatable.View animation='fadeInUpBig' duration={1000} style={styles.phansaugt}>


        <View style={{ marginTop: 30 }}></View>
      {/* tên tài khoản */}
        <View style={styles.inputView} >
          <Icon name={'ios-person-outline'} size={28} color={'rgba(255, 255, 255, 0.7)'} style={styles.icon}></Icon>
          <TextInput
            style={styles.inputText}
            placeholder="Tài khoản"
            placeholderTextColor="rgba(245, 355, 357, 0.5)"
            onChangeText={tk => setTk(tk)}
            defaultValue={tk}
            />

        </View>
        {/* email */}
        <View style={styles.inputView} >
          <Icon name={'ios-mail-outline'} size={28} color={'rgba(255, 255, 255, 0.7)'} style={styles.icon}></Icon>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="rgba(245, 355, 357, 0.5)"
            onChangeText={em => setEm(em)}
            defaultValue={em} />

        </View>
        {/* mật khẩu */}
        <View style={styles.inputView} >
          <Icon name={'ios-key-outline'} size={28} color={'rgba(255, 255, 255, 0.7)'} style={styles.icon}></Icon>
          <TextInput
            style={styles.inputText}
            secureTextEntry= {false}
            placeholder="Mật khẩu"
            placeholderTextColor="rgba(245, 355, 357, 0.5)"
            onChangeText={mk => setMk(mk)}
            defaultValue={mk} />
        </View>
        {/* nhập lại mật khẩu */}
        <View style={styles.inputView} >
          <Icon name={'ios-checkbox-outline'} size={28} color={'rgba(255, 255, 255, 0.7)'} style={styles.icon}></Icon>
          <TextInput
            style={styles.inputText}
            secureTextEntry={false}
            placeholder="Nhập lại Mật khẩu"
            placeholderTextColor="rgba(245, 355, 357, 0.5)"
            onChangeText={nhaplaimatkhau => setNhaplaimatkhau(nhaplaimatkhau)}
            defaultValue={nhaplaimatkhau} />
        </View>

        <TouchableOpacity onPress={Validatedangki}>
          <LinearGradient style={styles.linearGradient}
            colors={['#BD374F', 'rgba(245, 355, 357, 0.3)']}>
            <Text style={styles.Text}>đăng kí</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('mhdangnhap')}>
          <Text style={{ fontSize: 15, marginTop: 20 }}>Tôi đã có tài khoản</Text>
        </TouchableOpacity>
      </Animatable.View>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1919',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  phandaugt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  phansaugt: {
    flex: 3,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: '#992C40',
    alignItems: 'center'
  },
  logo: {
    width: 300,
    height: 100,
    marginTop: 30,
    resizeMode: 'stretch'
  },
  linearGradient: {
    padding: 10,
    width: '100%',
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'

  },
  Text: {
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.7)',
    backgroundColor: 'transparent',
  },
  inputView: {
    width: "90%",
    backgroundColor: 'rgba(245, 355, 357, 0.1)',
    borderRadius: 30,
    height: 50,
    marginBottom: 30,
    justifyContent: "center",
  },
  inputText: {
    fontSize:15,
    height: 50,
    color: "white",
    left: 50,
    marginRight: 100,
    paddingLeft: 10,
    marginHorizontal: 10


  },
  icon: {
    position: "absolute",
    left: 30
  },
  anmk: {
    position: "absolute",
    right: 20
  },
  dangkistyle: {
    fontSize: 40,
    marginTop: 20
  }

});
