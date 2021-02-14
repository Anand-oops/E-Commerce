import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Modal, TextInput, Alert, Image, ActivityIndicator } from 'react-native';
import Card from "../shared/Card";
import Firebase from '../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-simple-toast';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

export default function SubCategory({ navigation }) {

	var name = navigation.getParam('item').itemName;
	var id = navigation.getParam('id');
	console.log("id", id);
	console.log("name", name);
	const [listenCheck, setListenCheck] = useState(true);
	const [visibleModalAdd, setVisibleModalAdd] = useState(false);
	const [image, setImage] = useState(require('../assets/images/add.png'))
	const [items, setItems] = useState([]);
	const [text, onTextChange] = useState('');
	const [isChanged, setChanged] = useState(false);
	const [loader, setLoader] = useState(true);

	Firebase.database().ref(`DrawerItemsList/${id}/SubCategories`).on('value', (data) => {
		if (listenCheck) {
			if (data.val()) {
				setItems(data.val());
				console.log("Items", items);
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
		setItems([...items, { subitemName: text, uri: image.uri }])
		setVisibleModalAdd(false)
		setChanged(true);
		setImage(require('../assets/images/add.png'))
		onTextChange('')
	}

	function deleteItem(index) {
		console.log("deleted", index);
		const newArray = items;
		newArray.splice(index, 1);
		setItems(newArray);
		setChanged(true);
		saveToDatabase();
	}

	function saveToDatabase() {
		console.log("save", items);
		if (isChanged) {
			console.log("Id", id);
			Firebase.database().ref(`DrawerItemsList/${id}/SubCategories`).set(items).then(() => {
				setListenCheck(true)
				setChanged(false)
				Toast.show("Sub-Categories Updated", Toast.SHORT);
			})
		}
	}
	return (

		<View style={styles.main}>

			<FlatList data={items} renderItem={({ item }) =>
			(<Card>
				<Image
					style={{ padding: 2, height: '125%', width: 100, resizeMode: 'contain', alignSelf: 'center', }}
					source={{ uri: item.uri }}
				/>
				<Text style={{ color: 'black', fontSize: 20, marginStart: 5 }}>{item.subitemName}</Text>
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

			<TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 50 }}
				onPress={() => setVisibleModalAdd(!visibleModalAdd)}>
				<Ionicons name="add-circle" size={30} color="black" />
			</TouchableOpacity>

			<TouchableOpacity style={styles.saveButton}
				onPress={() => saveToDatabase()}>
				<Text style={{ color: 'white', fontSize: 20 }} >Submit</Text>
			</TouchableOpacity>


			<Modal
				visible={visibleModalAdd}
				position='center'
				transparent={true}
				onRequestClose={() => setVisibleModalAdd(false)}>
				<View style={styles.modalContainer}>
					<View style={styles.imageModalScreen}>
						<TouchableOpacity onPress={() => AddImageHandler()} style={styles.cardImageContainer}>
							<Image source={image} style={styles.cardImage} />
						</TouchableOpacity>

						<Text style={{ paddingLeft: 15, marginTop: 10, }}>Enter subcategory Name:</Text>
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
					color="grey"
					animating={loader}

				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	main: {
		height: '100%',
		width: '100%'
	},
	saveButton: {
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		alignItems: 'center',
		backgroundColor: 'black',
		padding: 15,
		elevation: 10,
	},
	container: {
		flex: 1,
		alignItems: "center",
		paddingTop: '50%'
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cardModalScreen: {
		height: 200,
		width: '85%',
		borderRadius: 15,
		justifyContent: 'center',
		elevation: 20,
		borderWidth: 1,
		borderColor: 'black',
		backgroundColor: 'white'
	}, modalTextInput: {
		width: '90%',
		marginVertical: 10,
		padding: 5,
		paddingLeft: 15,
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 10,
		backgroundColor: 'white'
	},
	modalButtonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: 15,
	},
	imageModalScreen: {
		height: 300,
		width: '85%',
		borderRadius: 20,
		justifyContent: 'center',
		elevation: 20,
		borderWidth: 1,
		borderColor: 'black',
		backgroundColor: 'white'
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