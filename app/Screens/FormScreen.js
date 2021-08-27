import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, SafeAreaView, ScrollView, ImageBackground, Alert, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MapView, { Marker } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';

const FormScreen = ({ navigation }) => {

  let Newdate = new Date;

  // State
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [zipCode, setZipCode] = React.useState('');
  const [city, setCity] = React.useState('');
  const [alertType, setAlertType] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [date, setDate] = React.useState(Newdate.getDate() + '-' + (Newdate.getMonth() + 1) + '-' + Newdate.getFullYear());
  const [hour, setHour] = React.useState(Newdate.getHours() + "h" + Newdate.getMinutes());
  const [adress, setAdress] = React.useState('');

  // Expo Location base state
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [mapRegion, setMapRegion] = React.useState({ longitude: 50.72625633978721, latitude: 1.6145736261308656, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
  const [isLocation, setIsLocation] = React.useState(false);

  // Activate location on click
  const __startLocalisation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setMapRegion({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
      longitudeDelta: 0.0922,
      latitudeDelta: 0.0421
    });
    setIsLocation(true);
    console.log(mapRegion);
  }

  // if(isLocation === false){
  //   setAdress(adress)
  // }

  const data = [firstName + '\n' + lastName + '\n' + email + '\n' + zipCode + '\n' + city + '\n' + alertType + '\n' + description + '\n' + date + '\n' + hour + '\n'];

  // Expo camera   
  let camera = Camera;
  const [startCamera, setStartCamera] = React.useState(false);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState(null);
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back);

  // Open Camera 
  const __startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync()
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert("Accès refusé")
    };
  };

  const __takePicture = async () => {
    if (!camera) return
    // if the camera is undefined or null, we stop the function execution
    const photo = await camera.takePictureAsync()
    console.log(photo)
    // setStartCamera(false)
    setPreviewVisible(true)
    setCapturedImage(photo)
    return (photo.uri)
  };

  const __savePhoto = async () => {
    const asset = await MediaLibrary.saveToLibraryAsync(photo.uri)
  };

  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }

  const __switchCamera = () => {
    if (cameraType === 'back') {
      setCameraType('front')
    } else {
      setCameraType('back')
    }
  }

  // Expo Location Permission
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission d\'accéder à la localisation refusée.');

        return;
      }
    })();
  }, []);


  // HandleSubmit Method
  const handleSubmit = () => {
    if (data != null) {
      alert('Votre alerte à été envoyée : \n' + data + '\n')
    } else (
      alert('veuillez entrez des données')
    )
  };

  return (
    <ScrollView>
      <View style={styles.container}>

        <Text style={styles.title}>FormScreen</Text>

        <TextInput style={styles.colInput} onChangeText={setFirstName} value={firstName} placeholder="Prénom" textContentType='name' />
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
        <TextInput style={styles.colInput} onChangeText={setDate} value={date} placeholder="Date" />
        <TextInput style={styles.colInput} onChangeText={setHour} value={hour} placeholder="Heure" />

        {/* Expo Location  */}
        <TouchableOpacity onPress={__startLocalisation}>
          <Text style={styles.submitBtn}>Me localiser</Text>
        </TouchableOpacity>

        {/* Expo Maps */}

        <View style={styles.container}>
          <MapView style={styles.map} initialRegion={mapRegion}>
            <Marker coordinate={mapRegion} title="Alerte" description="Alerte en cours">
              <View style={styles.circle}>
                <View style={styles.stroke}>
                  <View style={styles.core}>
                  </View>
                </View>
              </View>
            </Marker>
            {/* <View style={styles.searchBar}>
              <TextInput placeholder="Adresse" onChangeText={setAdress} value={adress} textContentType='location' autoCapitalize="none" style={{flex: 1, padding:0}} />
            </View> */}
          </MapView>
        </View>

        {/* Expo Camera */}
        {startCamera ? (
          <View style={{flex:1, width:'100%' }}>
            {previewVisible && capturedImage ? (
              <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
            ) : (
              <Camera
                type={cameraType}
                style={{ flex: 1 }}
                ref={(r) => {
                  camera = r
                }}
              > 
                <View style={styles.previewContainer}>
                  <View style={styles.previewWrapper}>
                    <TouchableOpacity onPress={__switchCamera} style={styles.snapBtnBis}>
                      <Text style={styles.btnText}>Flip</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.snapBtn}>
                    <TouchableOpacity onPress={__takePicture} style={styles.snapBtnBis}>
                      <Text style={styles.btnText}>Snap</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Camera>
            )}
          </View>
        ) : (
        <View style={styles.container}>
          <TouchableOpacity onPress={__startCamera} style={styles.btn}>
            <Text style={styles.btn}>Prendre une photo</Text>
          </TouchableOpacity>
        </View>
        )
      
      }      

        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.submitBtn}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const CameraPreview = ({ photo, retakePicture, savePhoto } = any) => {
  console.log('Preview ', photo)
  return (
    <View style={styles.camera}>
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={styles.container} >

        <TouchableOpacity onPress={retakePicture} style={styles.snapBtnThird}>
          <Text style={styles.btnText}>
            Refaire la photo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={savePhoto} style={styles.snapBtnFourth}>
          <Text style={styles.btnText}>
            Enregistrer la photo
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
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
  // Camera
  camera: {
    flex: 1,
    width: '100%',
    minWidth: 300,
    minHeight: 300,
  },
  btnText: {
    color: '#888',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginVertical: 20
  },
  snapBtn: {
    position: 'absolute',
    backgroundColor: 'red',
    bottom: 0,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    padding: 20,
    justifyContent: 'space-between'
  },
  snapBtnBis: {
    width: 70,
    height: 70,
    bottom: 10,
    borderRadius: 50,
    backgroundColor: '#fff',
    zIndex: 50
  },
  snapBtnThird: {
    width: 70,
    height: 70,
    bottom: 5,
    left: 20,
    borderRadius: 50,
    backgroundColor: '#fff',
    zIndex: 50
  },
  snapBtnFourth: {
    width: 70,
    height: 70,
    bottom: 150,
    left: 320,
    borderRadius: 50,
    backgroundColor: '#fff',
    zIndex: 50
  },

  // Preview
  previewContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },
  previewWrapper: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    padding: 20,
    justifyContent: 'space-between'
  },
  previewDiv: {
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center'
  },
  // Map
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 300,
    marginVertical: 10,
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 50,
    shadowColor: "#555",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.9
  },
  stroke: {
    width: 26,
    height: 26,
    borderRadius: 50,
    backgroundColor: '#fff',
    zIndex: 1
  },
  core: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 1,
    top: 1,
    bottom: 1,
    right: 1,
    backgroundColor: 'red',
    zIndex: 2,
    borderRadius: 50
  },
  // search
  searchBar: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
    width: 320,
    height: 50,
    elevation: 10,
    marginHorizontal: 15
  }
});

export default FormScreen;