import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Customgiaodiendrawer } from "../manhinh/customgiaodiendrawer";
import Themxoasua from '../manhinh/themxoasua';
import trangchu from '../manhinh/trangchu';

import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';


const Tab = createBottomTabNavigator();
const home = createStackNavigator();
const Drawer = createDrawerNavigator();
export default function manhinhchinh({ navigation }) {

    return (
        <Drawer.Navigator drawerContent={props => <Customgiaodiendrawer {...props}/>}>
             <Drawer.Screen name="Trang chủ" component={trangchu} />
            <Drawer.Screen  name="quản lý" component={Themxoasua} />
        </Drawer.Navigator>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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