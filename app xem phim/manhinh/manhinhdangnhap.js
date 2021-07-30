import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { AsyncStorage } from 'react-native';
import { useQuery, useMutation } from '@apollo/client'
import { CHECK_USERS } from '../truyvan/truyvangraphql'


export default function manhinhdangnhap({ navigation }) {
  const [checkuser, {data,loading, error}] = useMutation(CHECK_USERS)
  const [taikhoandangnhap, setTaikhoandangnhap] = useState('');
  const [matkhaudangnhap, setMatkhaudangnhap] = useState('');
  const [luudangnhap, setLuudangnhap] = useState(false);
  const tendangnhap_KEY = '@save_username'
  const matkhau_KEY = '@save_pass'



  const kiemtradangnhap = async () => {
    if (taikhoandangnhap == "") {
      alert('Hãy điền thông tin tài khoản của bạn')
      return false;
    }
    if (matkhaudangnhap == "") {
      alert('Hãy điền mật khẩu của bạn')
      return false;
    }
    if(taikhoandangnhap == "Admin" && matkhaudangnhap == "1"){
        await AsyncStorage.setItem(tendangnhap_KEY, taikhoandangnhap);
        await AsyncStorage.setItem(matkhau_KEY, matkhaudangnhap);
      navigation.navigate('mhchinh')
    }
    if(taikhoandangnhap != '' && matkhaudangnhap != ''){
        checkuser({variables: {taikhoan: taikhoandangnhap, matkhau: matkhaudangnhap}})
        // console.log(data.checkuser.matkhau)
        if(taikhoandangnhap == data.checkuser.taikhoan && matkhaudangnhap == data.checkuser.matkhau){
        await AsyncStorage.setItem(tendangnhap_KEY, taikhoandangnhap);
        await AsyncStorage.setItem(matkhau_KEY, matkhaudangnhap);
        setTaikhoandangnhap("")
        setMatkhaudangnhap("")
          navigation.navigate('mhchinh')
        }else{
          alert('tên tài khoản hoặc mật khẩu không chính xác!')
        }
    }
  
    

    // if (luudangnhap == true) {
    //   console.log(luudangnhap)
    //   console.log("lưu")
    //   if(taikhoandangnhap == "admin" && matkhaudangnhap == "1"){
    //     navigation.navigate('mhchinh')
    //   }
      // setTaikhoandangnhap("")
      //   setMatkhaudangnhap("")
      //  if (data == null) {
      //    console.log(error.message);
      //  }else{
      //   await AsyncStorage.setItem(tendangnhap_KEY, taikhoandangnhap);
      //   await AsyncStorage.setItem(matkhau_KEY, matkhaudangnhap);
      //   // console.log(data);
      //   navigation.navigate('mhchinh')

      
      
       
    // } else {
    //   console.log(luudangnhap)
    //   checkuser({variables: {taikhoan: taikhoandangnhap, matkhau: matkhaudangnhap}})
    //   setTaikhoandangnhap("")
    //     setMatkhaudangnhap("")
    //     if (error) {
    //       console.log(error.message);
    //     }else{
    //       console.log("thành công");
    //     //  navigation.navigate('mhchinh')
      
 
    //     }
    // }


  }


  // const ValitateUser = async () => {
  //   if (taikhoan == taikhoannguoidung.user && matkhau == taikhoannguoidung.pass) {
  //     await AsyncStorage.setItem(tendangnhap_KEY, taikhoan);
  //     await AsyncStorage.setItem(matkhau_KEY, matkhau);
  //     console.log("đăng nhập thành công")
  //     navigation.navigate('mhchinh')
  //   } else {
  //     console.log("đăng nhập thất bại")
  //   }
  // }

  useEffect(() => {
    readData()
  }, [])

  const readData = async () => {
    try {
      const userstorage = await AsyncStorage.getItem(tendangnhap_KEY)
      const passstorage = await AsyncStorage.getItem(matkhau_KEY)


      if (userstorage !== null && passstorage !== null) {
        console.log(userstorage + '__' + passstorage)
        navigation.navigate('mhchinh')
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }


  const Luudangnhap = () => {
    setLuudangnhap(!luudangnhap)
    console.log(luudangnhap)
  }
  return (
    <View style={styles.container}>
      <View style={styles.phandaugt}>
        <Animatable.Image animation='rubberBand' iterationCount='infinite' delay={2000} duration={3000} style={styles.logo} source={require('../hinhanh/logo.png')}></Animatable.Image>
      </View>
      <Animatable.View animation='fadeInUpBig' duration={1100} style={styles.phansaugt}>

        <View style={{ marginTop: 60 }}></View>
        <View style={styles.inputView} >
          <Icon name={'ios-person-outline'} size={28} color={'rgba(255, 255, 255, 0.7)'} style={styles.icon}></Icon>
          <TextInput
            style={styles.inputText}
            placeholder="Tài khoản"
            placeholderTextColor="rgba(245, 355, 357, 0.5)"
            onChangeText={taikhoandangnhap => setTaikhoandangnhap(taikhoandangnhap)}
            defaultValue={taikhoandangnhap} />

        </View>
        <View style={styles.inputView} >
          <Icon name={'ios-key-outline'} size={28} color={'rgba(255, 255, 255, 0.7)'} style={styles.icon}></Icon>
          <TextInput
            style={styles.inputText}
            placeholder="Mật khẩu"
            placeholderTextColor="rgba(245, 355, 357, 0.5)"
            onChangeText={matkhaudangnhap => setMatkhaudangnhap(matkhaudangnhap)}
            defaultValue={matkhaudangnhap} />
        </View>
        <View style={{ right: 150, flexDirection: 'row', alignItems: 'center' }}>
          {/* <CheckBox
            value={luudangnhap}
            onChange={() => Luudangnhap()}
            disabled={false}
          /> */}
          {/* <Text style={{ fontSize: 17 }}>Nhớ đăng nhập</Text> */}
        </View>

        <TouchableOpacity style={{ marginBottom: 20 }} onPress={kiemtradangnhap}>
          <LinearGradient style={styles.linearGradient}
            colors={['#BD374F', 'rgba(245, 355, 357, 0.3)']}>
            <Text style={styles.Text}>đăng nhập</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={{ fontSize: 15 }}>Forgort Password ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('mhdangki')}>
          <Animatable.Text animation='shake' iterationCount='infinite' iterationDelay={10000} duration={1500} style={{ fontSize: 15, marginTop: 20, padding: 10 }}>Đăng kí tài khoản ngay!!</Animatable.Text>
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
    flex: 2,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: '#992C40',
    alignItems: 'center'
  },
  logo: {
    width: 300,
    height: 150,
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
    color: 'rgba(255, 255, 255, 0.6)',
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
    width: 100,
    height: 50,
    fontSize: 20,
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
  }

});
