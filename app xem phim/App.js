import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View,Button,Header } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import manhinhdangki from './manhinh/manhinhdangki';
import manhinhdangnhap from './manhinh/manhinhdangnhap';
import Khuvucchuamanhinh from './Khuvuchuamanhinh';

const cache = new InMemoryCache()
const uri = "http://10.22.194.15:4000/graphql"
const client = new ApolloClient({
  uri,
  cache,
})

export default function App() {
  return (
    <ApolloProvider client={client}>
    <NavigationContainer>
        <Khuvucchuamanhinh/>
      </NavigationContainer>
    </ApolloProvider>
  );
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
