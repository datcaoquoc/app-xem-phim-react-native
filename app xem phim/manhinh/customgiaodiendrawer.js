import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Drawer } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { AsyncStorage } from 'react-native';

export function Customgiaodiendrawer(props) {
    const ValitateUser = async() => {
        await AsyncStorage.clear()
        props.navigation.navigate('mhdangnhap')
    }
    return (
        <View style={{ flex: 1 ,backgroundColor: '#992C40'}}>
        <DrawerContentScrollView>
        <View style={{justifyContent: 'center',
    alignItems: 'center'}}>
        <Animatable.Image animation='bounce' iterationCount='infinite' delay={2000} duration= {3000} style={styles.logo} source={require('../hinhanh/logo.png')}></Animatable.Image>
        </View>
                    <DrawerItem style={styles.styleitem}
                        icon={({ color, size }) => (
                            <Icon name='home-outline' color={color} size={30} ></Icon>
                        )}
                        label='Trang chủ'
                        onPress={() => {props.navigation.navigate('Trang chủ')}}
                    >


                    </DrawerItem>
                    <DrawerItem style={styles.styleitem}
                        icon={({ color, size }) => (
                            <Icon name='laptop-outline' color={color} size={30} ></Icon>
                        )}
                        label='Quản lý'
                        onPress={() => {props.navigation.navigate('quản lý')}}
                    >


                    </DrawerItem>
                    <DrawerItem style={styles.styleitem}
                        icon={({ color, size }) => (
                            <Icon name='heart-outline' color={color} size={30} ></Icon>
                        )}
                        label='quản lý thông báo'
                        onPress={() => {props.navigation.navigate('mhthongbaonotification')}}
                    >


                    </DrawerItem>
                    <DrawerItem style={styles.styleitem}
                        icon={({ color, size }) => (
                            <Icon name='ios-exit-outline' color={color} size={30} ></Icon>
                        )}
                        label='Đăng xuất'
                        onPress={ValitateUser}
                    >


                    </DrawerItem>
           
        </DrawerContentScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    styleitem: {
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    logo:{
        width:250,
        height:150,
        resizeMode: 'stretch',
        marginBottom: 20
    }
});