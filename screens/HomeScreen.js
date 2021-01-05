import React, { Component, useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import Firebase from '../firebaseConfig'
import { StatusBar } from 'expo-status-bar';
import { SliderBox } from "react-native-image-slider-box"
import * as ImagePicker from 'expo-image-picker'
import Toast from 'react-native-simple-toast';

function HomeScreen() {

	const { user } = useContext(AuthContext);

	// Firebase.database().ref(`/Admin/${user.uid}`)
	// 	.on('value', snapshot => console.log("User data: ", "changed"))

	Firebase.database().ref(`/Admin/${user.uid}`).update({
		id: user.uid,
		email: user.email,
		password: user.providerId,
	})

	const [imagesDeck, setImagesDeck] = useState([])
	const [isDeckChanged, setDeckChanged] = useState(false)
	const [deckListenStatus, setDeckListenStatus] = useState(true)
	const [imageIndex, setImageIndex] = useState()
	const [deleteImageNames, setDeleteImageNames] = useState([])



	Firebase.database().ref(`/ImagesDeck/`).once('value').then((data) => {
		if (deckListenStatus) {
			if (data.val()) {
				setImagesDeck(data.val())
				setDeckListenStatus(false)
			}
		}
	})

	const DeleteImageHandler = index => {
		if (imagesDeck.length > 0) {
			const imageDeckArray = imagesDeck;
			const imageRef = imageDeckArray.splice(index, 1);
			if (imageRef[0]) {
				const imageName = imageRef[0].imageName;
				setDeleteImageNames([...deleteImageNames, imageName])
				setImagesDeck(imageDeckArray)
			}
		}
	};

	const AddImageHandler = async (key) => {
		const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

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
		console.log(imageName)
		Firebase.storage()
			.ref(`ImagesDeck/${imageName}`)
			.put(blob)
			.then((snapshot) => {
				console.log(`${imageName} has been successfully uploaded.`);
				snapshot.ref.getDownloadURL().then((url) => {
					if (key == 'deck') {
						setDeckChanged(true);
						setImagesDeck([...imagesDeck, { imageName: imageName, uri: url }])
					}
				});
			})
			.catch((e) => console.log('uploading image error', e));

	};

	function SaveToDatabase() {
		let Imageflag = true;
		if (isDeckChanged) {
			Firebase.database().ref('/ImagesDeck').set(imagesDeck).then(() => {
				setDeckListenStatus(true);
				setDeckChanged(false);
			}).catch((error) => {
				Imageflag = false;
				console.log(error);
				Toast.show('Error occured while updating', Toast.SHORT);
			});
		}
		else {
			Toast.show('No new image selected', Toast.SHORT);
		}
		if (deleteImageNames.length > 0) {
			deleteImageNames.map(imageName =>
				Firebase.storage().ref('ImagesDeck/' + imageName).delete().then(() => {
					console.log(`${imageName} has been deleted successfully.`);
					Firebase.database().ref('/ImagesDeck').set(imagesDeck).then(() => {
						setDeckListenStatus(true);
						setDeckChanged(false);
					}).catch((e) => {
						Imageflag = false
						console.log('error on image deletion ', e)
						Toast.show('Error occured while updating', Toast.SHORT);
					})
				}));
			setDeleteImageNames([])
		}
		if (Imageflag) {
			Toast.show('Contents updated', Toast.SHORT);
		}
	}

	return (
		<View style={styles.container}>
			<StatusBar style="light" />

			<View style={{ flexDirection: "row", justifyContent: "space-around" }}>
				<Text style={styles.text} onPress={() => DeleteImageHandler(imageIndex)}>Delete</Text>
				<Text style={styles.text} onPress={() => AddImageHandler('deck')}>Add</Text>
			</View>

			<View style={{ elevation: 5, height: 175, borderColor: 'black', borderWidth: 1, }}>
				<SliderBox
					images={imagesDeck}
					autoplay={true}
					sliderBoxHeight={175}
					circleLoop={true}
					resizeMode={'contain'}
					currentImageEmitter={index => {
						setImageIndex(index)
					}}
				/>
			</View>
			<TouchableOpacity style={styles.saveButton} onPress={() => SaveToDatabase()}>
				<Text style={{ color: 'white' }}>SAVE CHANGES</Text>
			</TouchableOpacity>
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
		marginHorizontal: 20,
		color: '#333333'
	},
	saveButton: {
		backgroundColor: '#ec2F4B',
		padding: 15,
		elevation: 10,
		borderRadius: 10,
		margin: 5,
		alignItems: 'center',
	},
});