import React, { Component, useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import Firebase from '../firebaseConfig'
import { StatusBar } from 'expo-status-bar';
import { SliderBox } from "react-native-image-slider-box"
import * as ImagePicker from 'react-native-image-picker'

const HomeScreen = () => {

  const {user} = useContext(AuthContext);

  Firebase.database().ref(`/Admin/${user.uid}`)
  .on('value',snapshot => console.log("User data: ","changed"))

  Firebase.database().ref(`/Admin/${user.uid}`).update({
    id:user.uid,
    email:user.email,
    password:user.providerId,
	})

	const imagesDeck = []
	
	Firebase.database().ref('/ImagesDeck').on('value',(data) => {
		if (data.val()) {
			imagesDeck = data.val();	
		}
	})

	AddImageHandler = async (key) => {
        const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }
        let URI = pickerResult.uri;
        const imageName = URI.substring(URI.lastIndexOf('/') + 1);
        const response = await fetch(URI);
        const blob = await response.blob();
			Firebase.database()
            .ref(`/ImagesDeck/${imageName}`)
            .put(blob)
            .then((snapshot) => {
                console.log(`${imageName} has been successfully uploaded.`);
                snapshot.ref.getDownloadURL().then((url) => {
                    if (key == 'deck') {
                        imagesDeck = [...imagesDeck, {
                                imgName: imageName,
                                uri: url,
                    	}]
					}
                });
            })
            .catch((e) => console.log('uploading image error => ', e));
        //console.log(imagesDeck);
    };

  return (
    <View style={styles.container}>
      <StatusBar style="inverted" />

	  <View style={{flexDirection:"row", justifyContent:"space-between"}}>
	  <Text style={styles.text} >Delete</Text>
	  <Text style={styles.text} onPress={() => AddImageHandler('deck')}>Add</Text>
	  </View>
	  
      <SliderBox style={{elevation: 5,borderColor: 'black',borderWidth: 1,}}
            images={imagesDeck}
            autoplay={true}
            sliderBoxHeight={175}
            circleLoop={true}
            resizeMode={'contain'}
        />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#333333'
  }
});