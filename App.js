import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logo from './assets/logo.png';
import * as ImagePicker from 'expo-image-picker';

export default function App() {

  const [selectedImage, setSelectedImage] = React.useState(null);

  // Allow to use Camera and Gallery section
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("La permission d'utiliser la caméra est requise pour cet application. ");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  // if (selectedImage !== null) {
  //   return (
  //     <View style={styles.container}>
  //       <Image
  //         source={{ uri: selectedImage.localUri }}
  //         style={styles.thumbnail}
  //       />
  //     </View>
  //     );
  //   }

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

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.btn}>Insérer une photo</Text>
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
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});
