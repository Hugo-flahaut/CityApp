import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, TextInput, SafeAreaView, ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

const FormScreen = ({navigation}) => {

  // State
  const [firstName, setFirstName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [zipCode, setZipCode] = React.useState(null);
  const [city, setCity] = React.useState(null);
  const [alertType, setAlertType] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [date, setDate] = React.useState(null);
  const [hour, setHour] = React.useState(null);
  const [location, setLocation] = React.useState(null);
  // const [pictures, setPictures] = React.useState(null);

  const data = [firstName + lastName + email + zipCode + city + alertType + description + date + hour + location ] ;
  
  // Expo camera   
  let camera = Camera;
  const [startCamera, setStartCamera] = React.useState(false);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState(null);
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back);

  const __startCamera = async () => {
    const {status} = await Camera.requestPermissionsAsync()
    if(status === 'granted'){
      setStartCamera(true)
    }else{
        Alert.alert("Accès refusé")
    };
  };

  const __takePicture = async () => {
    if (!camera) return
    // if the camera is undefined or null, we stop the function execution
    const photo = await camera.takePictureAsync()
    console.log(photo)
    setPreviewVisible(true)
    setCapturedImage(photo)
  };
    
  // HandleSubmit Method
  const handleSubmit = () =>{
    if(data != null){
        alert('Votre alerte à été envoyée : ' + data) 
    }
    else {
        alert('veuillez entrez des données')
    }
  };

    return (
      <ScrollView>
        <View style={styles.container}>

          <Text style={styles.title}>FormScreen</Text>

            <TextInput style={styles.colInput} onChangeText={setFirstName} value={firstName} placeholder="Prénom" textContentType='name'  />
            <TextInput style={styles.colInput} onChangeText={setLastName} value={lastName} placeholder="Nom" textContentType='familyName' />
            <TextInput style={styles.colInput} onChangeText={setEmail} value={email} placeholder="Email" textContentType='emailAddress' />
            <TextInput style={styles.colInput} onChangeText={setZipCode} value={zipCode} placeholder="CP" textContentType='postalCode' />
            <TextInput style={styles.colInput} onChangeText={setCity} value={city} placeholder="Ville" textContentType='addressCity' />
            
            <Picker style={styles.selectInput}
                selectedValue={alertType}
                onValueChange={(itemValue, itemIndex) =>
                    setAlertType(itemValue)
                } placeholder="Type d'alerte">
                <Picker.Item label="Travaux" value="work" />
                <Picker.Item label="Stationnement" value="parking" />
                <Picker.Item label="Accident" value="accident" />
            </Picker>

            <TextInput style={styles.textAreatInput} onChangeText={setDescription} value={description} placeholder="Description" multiline={true} numberOfLines={8} />
            <TextInput style={styles.colInput} onChangeText={setDate} value={date} placeholder="Date"  />
            <TextInput style={styles.colInput} onChangeText={setHour} value={hour} placeholder="Heure" />
            <TextInput style={styles.colInput} onChangeText={setLocation} value={location} placeholder="Adresse" textContentType='location' />


            {/* Expo Camera */}
            {startCamera ? (
                <Camera style={styles.camera}
                  ref={(r) => {
                    camera = r
                  }}
                >
                  <View style={styles.snapBtn}>
                    <TouchableOpacity onPress={__takePicture} style={styles.snapBtnBis}>
                      <Text style={styles.btnText}>Snap</Text>
                    </TouchableOpacity>
                  </View>

                </Camera>
              ) : (
                <View style={styles.container}>
                  <TouchableOpacity onPress={__startCamera} style={styles.button}>
                      <Text style={styles.btn}>Prendre une photo</Text>
                  </TouchableOpacity>
                </View>
              )}
              
          <TouchableOpacity onPress={handleSubmit}>
              <Text style={styles.submitBtn}>Envoyer</Text>
          </TouchableOpacity>
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
    fontSize: 20
  },  
  btn: {
    backgroundColor: '#888',
    borderRadius: 10,
    height: 50,
    fontSize: 18,
    color: '#fff',
    marginHorizontal: 50,
    marginBottom: 15,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  },
  //   Form
  colInput: {
    height: 50,
    margin: 10,
    marginHorizontal: 50,
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#888',
    borderStyle: 'solid',
    borderRadius: 5,
  },
  selectInput: {
    height: 50,
    margin: 10,
    marginHorizontal: 50,
    fontSize: 18,
  },
  textAreatInput: {
    height: 200,
    margin: 10,
    marginHorizontal: 50,
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#888',
    borderStyle: 'solid',
    borderRadius: 5,
    textAlignVertical: 'top'
  },
  submitBtn: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    height: 50,
    fontSize: 18,
    color: '#fff',
    marginHorizontal: 50,
    marginVertical: 15,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  camera: {
    flex: 1,
    width: '100%',
    minWidth: 300,
    minHeight: 300,
  },
  btnText: {
    color: '#dfdfdf',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginVertical: 10
  },
  // Camera
  snapBtn: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    padding: 20,
    justifyContent: 'space-between'
  },
  snapBtnBis:{
    width : 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: '#fff'
  }
});

export default FormScreen;