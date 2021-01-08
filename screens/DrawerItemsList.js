import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Modal, TextInput, } from 'react-native';
import Card from "../shared/Card";
import Firebase from '../firebaseConfig';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
export default function DrawerItemsList() {

	const [listenCheck, setListenCheck] = useState(true);
	const [visible, setVisible] = useState(false);
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
		setVisible(!visible);
		setChanged(true);
		onTextChange('');
	};

	function saveToDatabase() {
		console.log("save", items);
		if (isChanged) {
			Firebase.database().ref('DrawerItemsList/').set(items).then(() => {
				
				setListenCheck(true)
			})
		}
	}
	return (

		<View style={styles.main}>

			<FlatList data={items} renderItem={({ item }) =>
			(<Card>
				<Text style={{ color: 'black', fontSize: 20 }}>{item.itemName}</Text>
				<TouchableOpacity style={{ position: 'absolute', right: 50 }} 
					onPress={() => {setVisible(true) ,onTextChange(item.itemName)}}>
					<Entypo name="edit" size={30} color="blue" />
				</TouchableOpacity>
				<TouchableOpacity style={{ position: 'absolute', right: 5 }}>
					<MaterialIcons name="delete" size={35} color="red" />
				</TouchableOpacity>
			</Card>)}>

			</FlatList>

			<TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 50 }}
				onPress={() => setVisible(!visible)}>
				<Ionicons name="add-circle" size={30} color="black" />
			</TouchableOpacity>

			<TouchableOpacity style={styles.saveButton}
				onPress={() => saveToDatabase()}>
				<Text style={{ color: 'white', fontSize: 20 }} >Submit</Text>
			</TouchableOpacity>

			<Modal
				visible={visible}
				position='center'
				transparent={true}
				onRequestClose={() => setVisible(!visible)}>
				<View style={styles.modalContainer}>
					<View style={styles.cardModalScreen}>
						<Text style={{ paddingLeft: 15, marginTop: 10, alignSelf:'center'}}>Add Item</Text>
						<View style={{ alignItems: 'center', justifyContent: 'center', }}>
							<TextInput style={styles.modalTextInput} onChangeText={(val) => onTextChange(val)}
								 value={text} placeholder={'Enter item name'} />
						</View>
						<View style={styles.modalButtonContainer}>
							<View style={{ padding: 10, width: '30%' }}>
								<Button title='Cancel' onPress={() => setVisible(!visible)} />
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
	saveButton : {
		borderTopLeftRadius:30,
		borderTopRightRadius:30,
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
	},modalTextInput: {
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



