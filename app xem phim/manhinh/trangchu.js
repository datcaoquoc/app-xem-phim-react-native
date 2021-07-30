import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, Image, TextInput, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import DropDownPicker from 'react-native-dropdown-picker';
import { SliderPaginationView } from 'react-native-slider-pagination';
import { useQuery, useMutation } from '@apollo/client'
import AppLoading from 'expo-app-loading'
import { QUERYPHIM, LISTPHIM_PHANTRANG } from '../truyvan/truyvangraphql'

export default function trangchu({ navigation }) {
  // const { data, loading, fetchMore } = useQuery(QUERYPHIM);
  let so = 1;
  const [sotrangload, setSotrangload] = useState(1);
  const [sotrangload2, setSotrangload2] = useState();
  const { data, loading, fetchMore} = useQuery(QUERYPHIM)
// const sotrangphan = () =>{
//   fetchMore({
//     variables: {
//       Sotrang : so++
//     },
//   })
//   // fetchMore({
//   //   variables: {
//   //     Sotrang : sotrang
//   //   },
//   // });
// }

  const Item = ({ idphim,tenp,anhp ,motap,namphathanhp,urlvideo,daodienp,quocgiap,loaip,urltl}) => (
    <View style={styles.listphim}>
      <Image source={{ uri: anhp}} style={{ flex: 14, width: "100%", height: 350, resizeMode: 'contain', marginTop: 10 }} />
      <Animatable.Image animation='flash' iterationCount='infinite' delay={2000} duration={1000} source={require('../hinhanh/new.png')} style={{ position: 'absolute', width: 100, height: 100, top: -1, left: 2 }} />
      <Text style={{ color: '#dacb46', marginTop: 10, fontSize: 12, flex: 2 }}>{tenp}</Text>
      
      {/* {loaiphim.map(loai => <Text>{loai.tenloai}</Text>)} */}
      <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => navigation.navigate('mhthongtinchitiet', { id:idphim,ten:tenp,anh:anhp ,mota:motap, namphathanh:namphathanhp,urlvd:urlvideo, daodien:daodienp,quocgia:quocgiap.tenquocgia,loai:loaip.tenloai,urltrail:urltl})}>
        <LinearGradient style={{ padding: 7, width: 100, alignItems: 'center' }}
          colors={['#BD374F', 'rgba(245, 355, 357, 0.3)']}>
          <Text style={styles.Text}>Chi tiết</Text>
        </LinearGradient>
      </TouchableOpacity>

    </View>

    
  );

  if (loading) {

    return <AppLoading />
  }



  return (
    <View style={styles.container}>

      <View style={styles.phandaugt}>
        {/* <Icon style={styles.icon} name={'ios-menu-outline'} size={40} color={'#fff'}></Icon> */}
        <Text style={styles.anmk}>Trang chủ</Text>
      </View>

      <View style={styles.phansaugt}>
      <FlatList
          data={data.phims}
          numColumns={2}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Item idphim= {item.id} tenp = {item.tenphim} anhp= {item.anhphim} motap = {item.mota} namphathanhp= {item.namphathanh} urlvideo={item.urlvideophim} daodienp={item.daodien} quocgiap= {item.quocgia} loaip={item.loaiphim} urltl={item.urltrailer}

            />
          )}
          // keyExtractor={(phim) => phim.id.toString()}
        />

        <View style={{ alignItems: 'center' }}>
          <SliderPaginationView
            pageCount={100}
            initialPage={1}
            // onPageChange={sotrangphan}
          />
        </View>


      </View>
    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  phandaugt: {
    flex: 1,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  phansaugt: {
    flex: 12,
    backgroundColor: '#1A1919',
  },
  icon: {
    position: "absolute",
    left: 30
  },
  anmk: {
    position: "absolute",
    left: 30,
    color: '#fff',
    fontSize: 20
  },
  listphim: {
    width: 400,
    height: 300,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000000',
    borderWidth: 1,
    margin: 10

  }

});