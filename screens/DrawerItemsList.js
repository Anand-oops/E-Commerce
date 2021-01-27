import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Modal, TextInput, Alert } from 'react-native';
import Card from "../shared/Card";
import Firebase from '../firebaseConfig';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-simple-toast'


export default function DrawerItemsList({navigation}) {

	const [listenCheck, setListenCheck] = useState(true);
	const [visibleModalAdd, setVisibleModalAdd] = useState(false);
	const [items, setItems] = useState([]);
	const [text, onTextChange] = useState('');
	const [isChanged, setChanged] = useState(false);

	Firebase.database().ref('DrawerItemsList/').once('value').then((data) => {
		if (listenCheck) {
			if (data.val()) {
				setItems(data.val());
				console.log("Items", items);
				setListenCheck(false);
			}
		}
	})

	const addItem = (text) => {
		console.log("add", text)
		setItems([...items, { itemName: text }]);
		setVisibleModalAdd(!visibleModalAdd);
		setChanged(true);
		onTextChange('');
	};


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
			Firebase.database().ref('DrawerItemsList/').set(items).then(() => {
				setListenCheck(true)
				setChanged(false)
				Toast.show("Categories Updated", Toast.SHORT);
			})
		}
	}

	const moveAhead=(item)=>{
		// console.log("naviagtion",navigation);
		// console.log("clicked");
		var index=items.indexOf(item);
     navigation.navigate('SubCategory',{item:item,id:index});
	}
	return (

		<View style={styles.main}>

			<FlatList data={items} renderItem={({ item }) =>
			(<Card>
				<Text style={{ color: 'black', fontSize: 20 }}>{item.itemName}</Text>
				<TouchableOpacity style={{ position: 'absolute', right: 45 }} onPress={() => {
					Alert.alert("Delete", "Are you sure ?",
						[
							{ text: "No" },
							{ text: "Yes", onPress: () => deleteItem(items.indexOf(item)) }
						], { cancelable: false }
					);
				}}>
					<MaterialIcons name="delete" size={35} color="red" />
				</TouchableOpacity>
				<TouchableOpacity style={{ position: 'absolute', right: 5 }} onPress={() => moveAhead(item)}>
				<AntDesign name="caretright" size={35} color="green" />
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
				onRequestClose={() => setVisibleModalAdd(!visibleModalAdd)}>
				<View style={styles.modalContainer}>
					<View style={styles.cardModalScreen}>
						<Text style={{ paddingLeft: 15, marginTop: 10, alignSelf: 'center' }}>Add Item</Text>
						<View style={{ alignItems: 'center', justifyContent: 'center', }}>
							<TextInput style={styles.modalTextInput} onChangeText={(val) => onTextChange(val)}
								value={text} placeholder={'Enter item name'} />
						</View>
						<View style={styles.modalButtonContainer}>
							<View style={{ padding: 10, width: '30%' }}>
								<Button title='Cancel' onPress={() => setVisibleModalAdd(!visibleModalAdd)} />
							</View>
							<View style={{ padding: 10, width: '30%' }}>
								<Button title='OK' onPress={() => addItem(text)} />

							</View>
						</View>
					</View>
				</View>
			</Modal>
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
});



