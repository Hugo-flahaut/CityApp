import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logo from './assets/logo.png';

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo}/>

      <Text style={styles.title}>City App</Text>

      <TouchableOpacity
        onPress={() => alert ('Hello World')} style={styles.alert}>
          <Text style={styles.btn}>
            Signaler une alerte
          </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => alert ('Hello World')} style={styles.alert}>
          <Text style={styles.btn}>
            Alertes en cours
          </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 175,
    marginBottom: 10 
  },
  title: {
    color: '#888',
    fontSize: 32,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  alert: {
    backgroundColor: '#fff'
  },
  btn: {
    backgroundColor: '#dfdfdf',
    borderRadius: 10,
    height: 50,
    width: 320,
    fontSize: 26,
    color: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});
