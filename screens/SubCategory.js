import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Modal, TextInput, Alert, Image, ActivityIndicator } from 'react-native';
import Card from "../shared/Card";
import Firebase from '../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-simple-toast';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

export default function SubCategory(props) {

	const id = props.route.params.id;

	const [listenCheck, setListenCheck] = useState(true);
	const [visibleModalAdd, setVisibleModalAdd] = useState(false);
	const [image, setImage] = useState(require('../assets/images/add.png'))
	const [items, setItems] = useState([]);
	const [text, onTextChange] = useState('');
	const [loader, setLoader] = useState(true);

	Firebase.database().ref(`DrawerItemsList/${id}/SubCategories`).on('value', (data) => {
		if (listenCheck) {
			if (data.val()) {
				setItems(data.val());
			}
			setListenCheck(false);
			setLoader(false);
		}
	})

	const AddImageHandler = async () => {
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
			.ref(`${imageName}`)
			.put(blob)
			.then((snapshot) => {
				console.log(`${imageName} has been successfully uploaded.`);
				snapshot.ref.getDownloadURL().then((url) => {
					setImage({
						imageName: imageName,
						uri: url,
					})
				});
			})
			.catch((e) => console.log('uploading image error', e));

	};
	const AddCardContent = (image, text) => {
		console.log("AddCardContent", text)
		var list = [...items, { subitemName: text, uri: image.uri }];
		setItems(list)
		setVisibleModalAdd(false)
		setImage(require('../assets/images/add.png'))
		onTextChange('')
		Firebase.database().ref(`DrawerItemsList/${id}/SubCategories`).set(list).then(() => {
			setListenCheck(true)
			Toast.show("Sub-Category Added", Toast.SHORT);
		})
	}

	function deleteItem(index) {
		console.log("deleted", index);
		const newArray = items;
		newArray.splice(index, 1);
		setItems(newArray);
		Firebase.database().ref(`DrawerItemsList/${id}/SubCategories`).set(newArray).then(() => {
			setListenCheck(true)
			Toast.show("Sub-Category Deleted", Toast.SHORT);
		})
	}

	return (

		<View style={styles.main}>

			<FlatList data={items} renderItem={({ item }) =>
			(<Card>
				<Image
					style={{ padding: 20, height: 100, width: 100, resizeMode: 'contain', alignSelf: 'center', }}
					source={{ uri: item.uri }}
				/>
				<Text style={{ color: 'black', fontSize: 20, marginLeft: 10 }}>{item.subitemName}</Text>
				<TouchableOpacity style={{ position: 'absolute', right: 10 }} onPress={() => {
					Alert.alert("Delete", "Are you sure ?",
						[
							{ text: "No" },
							{ text: "Yes", onPress: () => deleteItem(items.indexOf(item)) }
						], { cancelable: false }
					);
				}}>
					<MaterialIcons name="delete" size={35} color="red" />
				</TouchableOpacity>
			</Card>)}>

			</FlatList>

			<TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}
				onPress={() => setVisibleModalAdd(!visibleModalAdd)}>
				<Ionicons name="add-circle" size={50} color="black" />
			</TouchableOpacity>

			<Modal
				animationType='fade'
				visible={visibleModalAdd}
				position='center'
				transparent={true}
				onRequestClose={() => setVisibleModalAdd(false)}>
				<View style={styles.modalContainer}>
					<View style={styles.imageModalScreen}>
						<TouchableOpacity onPress={() => AddImageHandler()} style={styles.cardImageContainer}>
							<Image source={image} style={styles.cardImage} />
						</TouchableOpacity>

						<Text style={{ paddingLeft: 15, marginTop: 10, }}>Enter Sub-Category Name:</Text>
						<View style={{ alignItems: 'center', justifyContent: 'center', }}>
							<TextInput style={styles.modalTextInput} onChangeText={(Text) => onTextChange(Text)} value={text} />
						</View>

						<View style={styles.modalButtonContainer}>
							<View style={{ padding: 10, width: '30%' }}>
								<Button title='Cancel' onPress={() => setVisibleModalAdd(false)} />
							</View>
							<View style={{ padding: 10, width: '30%' }}>
								<Button title='OK' onPress={() => {
									if (!image.uri) {
										Toast.show("Pick Image from gallery", Toast.SHORT)
									} else if (!text) {
										Toast.show("Input value", Toast.SHORT)
									} else {
										AddCardContent(image, text);
									}

								}} />
							</View>

						</View>
					</View>
				</View>
			</Modal>
			<View style={{ position: 'absolute', zIndex: 4, alignSelf: 'center', flex: 1, top: '50%' }}>
				<ActivityIndicator

					size='large'
					color="#000a1a"
					animating={loader}

				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	main: {
		height: '100%',
		width: '100%',
		backgroundColor: '#a6b8ca'
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(52, 52, 52, 0.8)'
	},
	cardModalScreen: {
		height: 200,
		width: '85%',
		borderRadius: 15,
		justifyContent: 'center',
		elevation: 20,
		borderWidth: 1,
		borderColor: 'black',
		backgroundColor: '#d8eafd'
	}, 
	modalTextInput: {
		width: '90%',
		marginVertical: 10,
		padding: 5,
		paddingLeft: 15,
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 10,
		backgroundColor: 'white'
	},
	imageModalScreen: {
		height: 300,
		width: '85%',
		borderRadius: 20,
		justifyContent: 'center',
		elevation: 20,
		borderWidth: 1,
		borderColor: 'black',
		backgroundColor: '#d8eafd'
	},
	modalButtonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: 15,
	},
	cardImageContainer: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},

	cardImage: {
		height: 100,
		width: 100,
		marginTop: 20,
		resizeMode: 'contain',
		alignSelf: 'center'
	},
});