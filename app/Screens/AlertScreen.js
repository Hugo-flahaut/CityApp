import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';

const AlertScreen = ({navigation}) => {
    return (

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.text}>Type d'alerte :</Text>
            <Text style={styles.text}>A : </Text>
            <Text style={styles.text}>Description :</Text>
            <Text style={styles.text}>Signalé le : à : </Text>
            <Text style={styles.text}>Par : </Text>
            <Image style={styles.thumbnail}></Image>
          </View>
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-around',
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
  card:{
    borderWidth: 1,
    borderColor: '#888',
    borderStyle: 'solid',
    borderRadius: 5,
    marginHorizontal: 50,
    padding: 10,
    marginVertical: 10
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