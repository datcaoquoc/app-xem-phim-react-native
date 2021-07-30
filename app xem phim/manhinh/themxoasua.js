import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, Image, TextInput, Modal, ActivityIndicator, FlatList, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Swipeout from 'react-native-swipeout';
import * as Animatable from 'react-native-animatable';
import { useQuery, useMutation } from '@apollo/client'
import AppLoading from 'expo-app-loading'
import { QUERYPHIM, THEM,UPDATE_PHIM,XOA_PHIM } from '../truyvan/truyvangraphql'

export default function themxoasua({ navigation }) {

  //add query
  const { data, loading, fetchMore } = useQuery(QUERYPHIM)
  const [capnhatphim] = useMutation(UPDATE_PHIM);


  const [showmodalsua, setModalsua] = useState(false);
  const [show, setShow] = useState(false);

  //chính
  const [tenp, setTenp] = useState('');
  const [anhp, setAnhp] = useState('');
  const [motap, setMotap] = useState('');
  const [namphathanhp, setNamphathanhp] = useState('');
  const [urlvideop, setUrlvideop] = useState('');
  const [daodienp, setDaodienp] = useState('');
  const [quocgiap, setQuocgiap] = useState();
  const [loaiphimp, setLoaiphimp] = useState();
  const [urltrailerp, setUrltrailerp] = useState('');
  const [idsua, setIdsua] = useState('');
  const [iddaxoa, setIddaxoa] = useState('');





  const Item = ({ allthongtinphim }) => (
    <Swipeout right={[
      {
        onPress: () => {hoixoaphim({idcanxoa: allthongtinphim.id})},
        text: 'xóa',
        backgroundColor: '#992C40',
        color: '#000000',
        component: (<Icon name={'ios-trash-outline'} size={33} color={'rgba(255, 255, 255, 0.7)'} style={styles.iconxoa}></Icon>)
      },
      {
        onPress: () => { Gangiatricapnhat({ ttphimsua: allthongtinphim }) },
        text: 'Cập nhật',
        backgroundColor: '#1C9C3E',
        color: '#000000',
        component: (<Icon name={'ios-brush-outline'} size={33} color={'rgba(255, 255, 255, 0.7)'} style={styles.iconxoa}></Icon>)
      }
    ]} autoClose={true} backgroundColor='#992C40'>
      <View style={styles.listphim}>
        <Image source={{ uri: allthongtinphim.anhphim }} style={{ flex: 1, width: 100, height: 100, resizeMode: 'contain', marginTop: 10 }} />
        <Text style={{ color: '#dacb46', marginTop: 10, fontSize: 20, flex: 3 }}>{allthongtinphim.tenphim}</Text>
      </View>
    </Swipeout>
  );

  const Gangiatricapnhat = ({ ttphimsua }) => {
    setIdsua(ttphimsua.id)
    setTenp(ttphimsua.tenphim);
    setAnhp(ttphimsua.anhphim);
    setMotap(ttphimsua.mota);
    setNamphathanhp(ttphimsua.namphathanh);
    setUrlvideop(ttphimsua.urlvideophim);
    setDaodienp(ttphimsua.daodien);
    setQuocgiap(ttphimsua.quocgia.id);
    setLoaiphimp(ttphimsua.loaiphim.id);
    setUrltrailerp(ttphimsua.urltrailer);
    setModalsua(true)


  }

  const Capnhatphim = () => {
    if (tenp == '') {
      alert('Tên không được trống')
      return false;
    }
    if (anhp == '') {
      alert('Ảnh đại diện phim không được trống')
      return false;
    }

    if (namphathanhp == '') {
      alert('Năm phát hành không được trống')
      return false;
    }
    if (loaiphimp == undefined) {
      alert('Vui lòng chọn loại phim')
      return false;
    }
    if (quocgiap == undefined) {
      alert('Vui lòng chọn quốc gia')
      return false;
    }
    if (urlvideop == '') {
      alert('Video không được trống')
      return false;
    }
    if (motap == '') {
      alert('Mô tả không được trống')
      return false;
    }
    if (urltrailerp == '') {
      alert('Trailler phim không được trống')
      return false;
    }
    if (daodienp == '') {
      alert('Đạo diễn không được trống')
      return false;
    }


    if (tenp != '' && anhp != '' && urlvideop != '' && motap != '' && namphathanhp != '' && daodienp != '' && quocgiap != '' && loaiphimp != '' && urltrailerp != '') {
      capnhatphim({ variables: {id: idsua , anhphim: anhp, tenphim: tenp, mota: motap, namphathanh: namphathanhp, urlvideophim: urlvideop, daodien: daodienp, quocgiaId: quocgiap, loaiphimId: loaiphimp, urltrailer: urltrailerp } })
      setIdsua('')
      setTenp('');
      setAnhp('');
      setMotap('');
      setNamphathanhp('');
      setUrlvideop('');
      setDaodienp('');
      setQuocgiap();
      setLoaiphimp();
      setUrltrailerp('');
      setModalsua(false)
      alert('Cập nhật thành công !')
    }
  }
  
  const [xoaPhim] = useMutation(XOA_PHIM, {
    update: (cache) => {
      const data = cache.readQuery({ query: QUERYPHIM });
      cache.writeQuery({
        query: QUERYPHIM,
        data: {
          ...data,
          phims: data.phims.filter((d) => (d.id !== iddaxoa))
        }
      })

    }
  })

  const xoa = ({ idxoa }) => {
    console.log(idxoa)
    xoaPhim({ variables: { id: idxoa } })
    alert('Xóa thành công')
  };

  const hoixoaphim = ({idcanxoa}) => {
    setIddaxoa(idcanxoa)
    Alert.alert(
      'THÔNG BÁO',
      'Bạn có muốn xóa sản phẩm này không',

      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        { text: 'OK', onPress: () => { xoa({ idxoa: idcanxoa }) } }
      ],
      { cancelable: false }
    )

  }


  const showmodal = () => {



    setShow(true);

  }

  const [themphim] = useMutation(THEM,
    {
      update: (cache, mutationResult) => {
        const mang = mutationResult.data.themphim;
        const data = cache.readQuery({
          query: QUERYPHIM,
          variables: {
            tenphim: mang.tenphim, anhphim: mang.anhphim, mota: mang.mota,
            namphathanh: mang.namphathanh, urlvideophim: mang.urlvideophim, daodien: mang.daodien,
            quocgiaId: mang.quocgiaId, loaiphimId: mang.loaiphimId, urltrailer: mang.urltrailer
          }
        });
        cache.writeQuery({
          query: QUERYPHIM,
          variables: {
            tenphim: mang.tenphim, anhphim: mang.anhphim, mota: mang.mota,
            namphathanh: mang.namphathanh, urlvideophim: mang.urlvideophim, daodien: mang.daodien,
            quocgiaId: mang.quocgiaId, loaiphimId: mang.loaiphimId, urltrailer: mang.urltrailer
          },
          data: { phims: [...data.phims, mang] }
        })
      }
    });

  const them = () => {
    if (tenp == '') {
      alert('Tên không được trống')
      return false;
    }
    if (anhp == '') {
      alert('Ảnh đại diện phim không được trống')
      return false;
    }

    if (namphathanhp == '') {
      alert('Năm phát hành không được trống')
      return false;
    }
    if (loaiphimp == undefined) {
      alert('Vui lòng chọn loại phim')
      return false;
    }
    if (quocgiap == undefined) {
      alert('Vui lòng chọn quốc gia')
      return false;
    }
    if (urlvideop == '') {
      alert('Video không được trống')
      return false;
    }
    if (motap == '') {
      alert('Mô tả không được trống')
      return false;
    }
    if (urltrailerp == '') {
      alert('Trailler phim không được trống')
      return false;
    }
    if (daodienp == '') {
      alert('Đạo diễn không được trống')
      return false;
    }


    if (tenp != '' && anhp != '' && urlvideop != '' && motap != '' && namphathanhp != '' && daodienp != '' && quocgiap != '' && loaiphimp != '' && urltrailerp != '') {
      themphim({ variables: { anhphim: anhp, tenphim: tenp, mota: motap, namphathanh: namphathanhp, urlvideophim: urlvideop, daodien: daodienp, quocgiaId: quocgiap, loaiphimId: loaiphimp, urltrailer: urltrailerp } })
      setTenp('');
      setAnhp('');
      setMotap('');
      setNamphathanhp('');
      setUrlvideop('');
      setDaodienp('');
      setQuocgiap();
      setLoaiphimp();
      setUrltrailerp('');
      setShow(false);
      alert('Thêm thành công !')
    }

  }
  const dongshowmodal = () => {
    setShow(false)
  }
  const dongshowmodalsua = () => {
    setModalsua(false)
  }


  if (loading) {

    return <AppLoading />
  }

  return (
    <View style={styles.container}>

      {/* modal them */}
      <Modal transparent={true} visible={show} animationType="slide">
        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
          <View style={{ backgroundColor: "#992C40", margin: 30, padding: 20, borderRadius: 10, marginTop: 40 }}>
            <Icon onPress={dongshowmodal} name={'ios-close-circle-outline'} size={43} color={'rgba(255, 255, 255, 0.7)'} style={styles.icon}></Icon>
            <Text style={{ fontStyle: 'italic', fontSize: 15, marginBottom: 20 }} >Thêm Phim</Text>
            <TextInput style={styles.input}

              underlineColorAndroid="transparent"
              placeholder="Nhập tên phim"
              placeholderTextColor="rgba(245, 355, 357, 0.5)"
              autoCapitalize="none"
              onChangeText={tenp => setTenp(tenp)}
              defaultValue={tenp}
            >

            </TextInput>
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Nhập ảnh đại diện phim"
              placeholderTextColor="rgba(245, 355, 357, 0.5)"
              autoCapitalize="none"
              onChangeText={anhp => setAnhp(anhp)}
              defaultValue={anhp}
            >
            </TextInput>
            <TextInput style={styles.input}

              underlineColorAndroid="transparent"
              placeholder="Nhập năm phát hành"
              placeholderTextColor="rgba(245, 355, 357, 0.5)"
              autoCapitalize="none"
              onChangeText={namphathanhp => setNamphathanhp(namphathanhp)}
              defaultValue={namphathanhp}
            ></TextInput>

            <Text style={{fontSize:12,  color: "#fff", marginBottom: 7 }}>Loại phim : </Text>


            <DropDownPicker
              items={[
                { label: 'Hành động', value: 1},
                { label: 'Phim chiếu rạp', value: 2 },
                { label: 'Siêu anh hùng', value: 3 },
                { label: 'Viễn tưởng', value: 4 },
                { label: 'Tâm lý', value: 5 },
                { label: 'Kinh dị', value: 6 },
                { label: 'Chiến tranh', value: 7 },
                { label: 'Bom tấn', value: 8 },
                { label: 'Hoạt hình', value: 9 },
                { label: 'Phiêu lưu', value: 10 },
                { label: 'Hài hước', value: 11 },
                { label: 'Viễn tây', value: 12 },
              ]}

              defaultValue={loaiphimp}
              containerStyle={{ height: 40 }}
              style={{ backgroundColor: '#fafafa', marginBottom: 10 }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={item => setLoaiphimp(item.value)}
            />
            <Text style={{fontSize:12,  color: "#fff", marginBottom: 7 }}>Quốc gia : </Text>
            <DropDownPicker
              items={[
                { label: 'Anh', value: 1},
                { label: 'Pháp', value: 2 },
                { label: 'Tây Ban Nha', value: 3 },
                { label: 'Việt Nam', value: 4 },
                { label: 'Mỹ', value: 5 },
                { label: 'Trung Quốc', value: 6 },
                { label: 'Hàn Quốc', value: 7 },
                { label: 'Canada', value: 8 },

              ]}
              defaultValue={quocgiap}
              containerStyle={{ height: 40 }}
              style={{ backgroundColor: '#fafafa', marginBottom: 10 }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={item => setQuocgiap(item.value)}
            />

            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Url video"
              placeholderTextColor="rgba(245, 355, 357, 0.5)"
              autoCapitalize="none"
              onChangeText={urlvideop => setUrlvideop(urlvideop)}
              defaultValue={urlvideop}
            >
            </TextInput>


            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Mô tả"
              placeholderTextColor="rgba(245, 355, 357, 0.5)"
              autoCapitalize="none"
              onChangeText={motap => setMotap(motap)}
              defaultValue={motap}
            >
            </TextInput>
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Nhập url trailer"
              placeholderTextColor="rgba(245, 355, 357, 0.5)"
              autoCapitalize="none"
              onChangeText={urltrailerp => setUrltrailerp(urltrailerp)}
              defaultValue={urltrailerp}
            >
            </TextInput>
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="nhập đạo diễn"
              placeholderTextColor="rgba(245, 355, 357, 0.5)"
              autoCapitalize="none"
              onChangeText={daodienp => setDaodienp(daodienp)}
              defaultValue={daodienp}
            ></TextInput>



            <Button onPress={them} style={{ marginTop: 100 }} title="Thêm Phim" />
          </View>
        </View>
      </Modal>


      {/* modal sửa */}
      <Modal transparent={true} visible={showmodalsua} animationType="slide">
        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
          <View style={{ backgroundColor: "#992C40", margin: 30, padding: 20, borderRadius: 10, marginTop: 40 }}>
            <Icon onPress={dongshowmodalsua} name={'ios-close-circle-outline'} size={43} color={'rgba(255, 255, 255, 0.7)'} style={styles.icon}></Icon>
            <Text style={{ fontStyle: 'italic', fontSize: 15, marginBottom: 20 }} >Sửa Phim</Text>
            <TextInput style={styles.input}

              underlineColorAndroid="transparent"
              placeholder="Nhập tên phim"
              placeholderTextColor="rgba(245, 355, 357, 0.5)"
              autoCapitalize="none"
              onChangeText={tenp => setTenp(tenp)}
              defaultValue={tenp}
            >

            </TextInput>
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Nhập ảnh đại diện phim"
              placeholderTextColor="rgba(245, 355, 357, 0.5)"
              autoCapitalize="none"
              onChangeText={anhp => setAnhp(anhp)}
              defaultValue={anhp}
            >
            </TextInput>
            <TextInput style={styles.input}

              underlineColorAndroid="transparent"
              placeholder="Nhập năm phát hành"
              placeholderTextColor="rgba(245, 355, 357, 0.5)"
              autoCapitalize="none"
              onChangeText={namphathanhp => setNamphathanhp(namphathanhp)}
              defaultValue={namphathanhp}
            ></TextInput>

            <Text style={{fontSize:12, color: "#fff", marginBottom: 7 }}>Loại phim : </Text>


            <DropDownPicker
              items={[
                { label: 'Hành động', value: '1' },
                { label: 'Phim chiếu rạp', value: '2' },
                { label: 'Siêu anh hùng', value: '3' },
                { label: 'Viễn tưởng', value: '4' },
                { label: 'Tâm lý', value: '5' },
                { label: 'Kinh dị', value: '6' },
                { label: 'Chiến tranh', value: '7' },
                { label: 'Bom tấn', value: '8' },
                { label: 'Hoạt hình', value: '9' },
                { label: 'Phiêu lưu', value: '10' },
                { label: 'Hài hước', value: '11' },
                { label: 'Viễn tây', value: '12' },
              ]}

              defaultValue={loaiphimp}
              containerStyle={{ height: 40 }}
              style={{ backgroundColor: '#fafafa', marginBottom: 10 }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={item => setLoaiphimp(item.value)}
            />




            <Text style={{fontSize:12, color: "#fff", marginBottom: 7 }}>Quốc gia : </Text>
            <DropDownPicker
              items={[
                { label: 'Anh', value: '1' },
                { label: 'Pháp', value: '2' },
                { label: 'Tây Ban Nha', value: '3' },
                { label: 'Việt Nam', value: '4' },
                { label: 'Mỹ', value: '5' },
                { label: 'Trung Quốc', value: '6' },
                { label: 'Hàn Quốc', value: '7' },
                { label: 'Canada', value: '8' },

              ]}
              defaultValue={quocgiap}
              containerStyle={{ height: 40 }}
              style={{ backgroundColor: '#fafafa', marginBottom: 10 }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={item => setQuocgiap(item.value)}
            />

            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Url video"
              placeholderTextColor="rgba(245, 355, 357, 0.5)"
              autoCapitalize="none"
              onChangeText={urlvideop => setUrlvideop(urlvideop)}
              defaultValue={urlvideop}
            >
            </TextInput>


            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Mô tả"
              placeholderTextColor="rgba(245, 355, 357, 0.5)"
              autoCapitalize="none"
              onChangeText={motap => setMotap(motap)}
              defaultValue={motap}
            >
            </TextInput>
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Nhập url trailer"
              placeholderTextColor="rgba(245, 355, 357, 0.5)"
              autoCapitalize="none"
              onChangeText={urltrailerp => setUrltrailerp(urltrailerp)}
              defaultValue={urltrailerp}
            >
            </TextInput>
            <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="nhập đạo diễn"
              placeholderTextColor="rgba(245, 355, 357, 0.5)"
              autoCapitalize="none"
              onChangeText={daodienp => setDaodienp(daodienp)}
              defaultValue={daodienp}
            ></TextInput>
            <Button onPress={Capnhatphim} style={{ marginTop: 100 }} title="Sửa Phim" />
          </View>
        </View>
      </Modal>

      <View style={styles.phandaugt}>
        <Icon onPress={() => navigation.openDrawer()} style={styles.icon2} name={'ios-menu-outline'} size={40} color={'#fff'}></Icon>
        <Text style={styles.anmk}>Quản lý</Text>
        <Icon onPress={showmodal} style={styles.icon1} name={'ios-add-circle-outline'} size={40} color={'#fff'}></Icon>
        {/* <Icon style={styles.icon3} name={'reload-outline'} size={38} color={'#fff'}></Icon> */}
      </View>
      <View style={styles.phansaugt}>
        <FlatList
          data={data.phims}
          renderItem={({ item }) => (
            <Item allthongtinphim={item}

            />
          )}
          keyExtractor={(phim) => phim.id.toString()}
        />
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
    flex: 2,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  phansaugt: {
    flex: 12,
    flexDirection: 'row',
    backgroundColor: '#1A1919',
  },
  icon2: {
    position: "absolute",
    left: 30
  },
  icon1: {
    position: "absolute",
    right: 20
  },
  icon3: {
    position: "absolute",
    right: 100
  },
  anmk: {
    position: "absolute",
    left: 80,
    color: '#fff',
    fontSize: 20
  },
  input: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 15,
    height: 35,
    borderColor: '#000000',
    borderBottomWidth: 1
  },
  icon: {
    position: "absolute",
    top: 2,
    right: 2
  },
  iconxoa: {
    position: "absolute",
    top: 40,
    right: 20
  },
  listphim: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1A1919',
    padding: 10
  }
});