import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Modal, TextInput, Alert, ActivityIndicator } from 'react-native';
import Card from "../shared/Card";
import Firebase from '../firebaseConfig';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-simple-toast'


export default function DrawerItemsList({ navigation }) {

	const [listenCheck, setListenCheck] = useState(true);
	const [visibleModalAdd, setVisibleModalAdd] = useState(false);
	const [items, setItems] = useState([]);
	const [text, onTextChange] = useState('');
	const [loader, setLoader] = useState(true);

	Firebase.database().ref('DrawerItemsList/').on('value', (data) => {
		if (listenCheck) {
			if (data.val()) {
				setItems(data.val());
			}
			setListenCheck(false);
			setLoader(false);
		}
	})

	const addItem = (text) => {
		console.log("add", text)
		var list = [...items, { itemName: text }]
		setItems(list);
		setVisibleModalAdd(false);
		onTextChange('');
		Firebase.database().ref('DrawerItemsList/').set(list).then(() => {
			setListenCheck(true)
			Toast.show("Category Added", Toast.SHORT);
		})
	};


	function deleteItem(index) {
		console.log("deleted", index);
		const newArray = items;
		newArray.splice(index, 1);
		setItems(newArray);
		Firebase.database().ref('DrawerItemsList/').set(newArray).then(() => {
			setListenCheck(true)
			Toast.show("Category Deleted", Toast.SHORT);
		})
	}

	const moveAhead = (item) => {
		var index = items.indexOf(item);
		navigation.navigate('SubCategory', { item: item, id: index });
	}

	return (

		<View style={styles.main}>

			<FlatList data={items} renderItem={({ item }) =>
			(<Card>
				<Text style={{ color: 'black', fontSize: 20, padding: 20 }}>{item.itemName}</Text>
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
					<AntDesign name="caretright" size={35} color="black" />
				</TouchableOpacity>
			</Card>)}>

			</FlatList>

			<TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}
				onPress={() => setVisibleModalAdd(true)}>
				<Ionicons name="add-circle" size={50} color="black" />
			</TouchableOpacity>

			<Modal
				visible={visibleModalAdd}
				animationType='fade'
				position='center'
				transparent={true}
				onRequestClose={() => setVisibleModalAdd(!visibleModalAdd)}>
				<View style={styles.modalContainer}>
					<View style={styles.cardModalScreen}>
						<Text style={{ paddingLeft: 15, marginTop: 10, alignSelf: 'center' }}>Add Category</Text>
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
	container: {
		flex: 1,
		alignItems: "center",
		paddingTop: '50%'
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



