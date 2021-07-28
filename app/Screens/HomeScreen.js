import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import logo from '../assets/logo.png';

const HomeScreen = ({navigation}) => {
  return (

      <View style={styles.container}>
          <Image source={logo} style={styles.logo}/>

          <Text style={styles.title}>City App</Text>
  
          <TouchableOpacity
            onPress={() => navigation.navigate('Form')} style={styles.alert}>
              <Text style={styles.btn}>
                  Signaler une alerte
              </Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            onPress={() => navigation.navigate('Alert')} style={styles.alert}>
              <Text style={styles.btn}>
                  Alertes en cours
              </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Disclaimer')} style={styles.alert}>
              <Text style={styles.disclaimerBtn}>
                  Mentions légales
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
  text: {
    color: '#888',
    fontSize: 18
  },  
  alert: {
    backgroundColor: '#fff'
  },
  btn: {
    backgroundColor: '#ffc107',
    borderRadius: 10,
    height: 50,
    width: 320,
    fontSize: 26,
    color: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  disclaimerBtn:{
    backgroundColor: '#007bff',
    borderRadius: 10,
    height: 35,
    width: 320,
    fontSize: 26,
    color: '#fff',
    marginHorizontal: 15,
    marginTop: 25,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});

export default HomeScreen;