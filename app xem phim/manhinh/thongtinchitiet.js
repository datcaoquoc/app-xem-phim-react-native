import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, Image, TextInput, ActivityIndicator, FlatList } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { Video } from 'expo-av';

export default function thongtinchitiet({ navigation, route }) {
    const [taikhoan, setTaikhoan] = useState('');
    const [matkhau, setMatkhau] = useState('');
    const [giatridropdow, setGiatridropdow] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    // const [linkvideo, setLinkvideo] = useState(route.params.video);




    return (
        <ScrollView style={styles.container}>
            <View style={styles.container}>
                {/* <View style={styles.phandaugt}>
                    <Icon style={styles.icon2} name={'chevron-back-outline'} size={50} color={'#fff'} onPress={() => navigation.navigate('mhtrangchu')}></Icon>
                    <Text style={styles.anmk}>Thông tin phim</Text>
                </View> */}

                <View style={styles.phansaugt}>
                    <Image source={{ uri: route.params.anh }} style={{ flex: 4, resizeMode: 'contain', margin: 10 }} />
                    <View style={styles.chitiet}>
                        <Text style={{ marginTop: 10, fontSize: 20, color: '#dacb46' }}>{route.params.ten}</Text>
                        <View style={{ flexDirection: 'row', borderTopColor: '#f4f4f4', borderTopWidth: 1 }}>
                            <Text style={{ fontSize: 15, color: '#dacb46', marginTop: 20 }}>Loại phim : </Text>
                            <Text style={{ fontSize: 15, color: '#ffffff', marginTop: 20 }}>{route.params.loai}</Text>

                        </View>
                        <View style={{ flexDirection: 'row', borderTopColor: '#f4f4f4', borderTopWidth: 1 }}>
                            <Text style={{ fontSize: 15, color: '#dacb46', marginTop: 20 }}>Quốc gia : </Text>
                            <Text style={{ fontSize: 15, color: '#ffffff', marginTop: 20 }}>{route.params.quocgia}</Text>

                        </View>
                        <View style={{ flexDirection: 'row', borderTopColor: '#f4f4f4', borderTopWidth: 1 }}>
                            <Text style={{ fontSize: 15, color: '#dacb46', marginTop: 20 }}>Đạo diễn : </Text>
                            <Text style={{ fontSize: 15, color: '#ffffff', marginTop: 20 }}>{route.params.daodien}</Text>

                        </View>
                        <View style={{ flexDirection: 'row', borderTopColor: '#f4f4f4', borderTopWidth: 1 }}>
                            <Text style={{ fontSize: 15, color: '#dacb46', marginTop: 20 }}>Năm : </Text>
                            <Text style={{ fontSize: 15, color: '#ffffff', marginTop: 20 }}>{route.params.namphathanh}</Text>

                        </View>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('mhchayvideo', {videophim: route.params.urlvd})} style={{ marginTop: 20, width: 160, alignItems: 'center' }}>
                                <LinearGradient style={styles.linearGradient}
                                    colors={['#BD374F', 'rgba(245, 355, 357, 0.3)']}>
                                    <Text style={styles.xemphim}>Play phim</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                
                <Text style={{marginLeft: 15, fontSize: 20, color: '#dacb46', marginTop: 10 , marginBottom: 10}}>TRAILLER : </Text>
                <Video
                    source={{ uri: route.params.urltrail }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    useNativeControls={true}
                    shouldPlay
                    isLooping
                    style={{ width: '100%', height: 200 }}
                />
                </View>
                  
                    <View style={styles.phancuoi}>
                    <Text style={{marginLeft: 10, fontSize: 20, color: '#dacb46', marginTop: 10 }}>NỘI DUNG PHIM :</Text>
                    <Text style={{margin: 5, fontSize: 15, color: '#ffffff', marginTop: 10 }}>{route.params.mota}</Text>

                {/* <Text style={{ fontSize: 20, color: '#dacb46', marginTop: 10 , marginBottom: 10}}>Đánh giá phim : </Text> */}

            </View>
        </ScrollView>


    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1919',

    },
    anmk: {
        position: "absolute",
        left: 80,
        color: '#fff',
        fontSize: 20
    },
    phandaugt: {
        flex: 2,
        backgroundColor: '#000',
        paddingLeft: 20,
        justifyContent: 'center',
    },
    phansaugt: {
        flex: 10,
        flexDirection: 'row',
        backgroundColor: '#1A1919',
    },
    phancuoi: {
        padding: 10,
        margin: 7,
        flex: 14,
        backgroundColor: '#3B3838',
    },
    icon: {
        position: "absolute",
        left: 30
    },
    icon2: {
        margin: 10
    },
    anmk: {
        position: "absolute",
        left: 80,
        color: '#fff',
        fontSize: 20
    },
    linearGradient: {
        borderRadius: 10,
    },
    listphim: {
        width: 400,
        height: 400,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#000000',
        borderWidth: 1,
        margin: 20

    },
    chitiet: {
        flex: 4,
        padding: 5,
        backgroundColor: '#1A1919'
    },
    xemphim: {
        padding: 10
    }

});