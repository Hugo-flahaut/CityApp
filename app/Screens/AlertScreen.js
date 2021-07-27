import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AlertScreen = ({navigation}) => {
    return (

        <View style={styles.container}>

            <Text style={styles.title}>Alert Screen</Text>

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
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});

export default AlertScreen;