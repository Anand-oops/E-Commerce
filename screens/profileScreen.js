import React, { useContext, useState } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { View, Text, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-simple-toast'
import Firebase from '../firebaseConfig'
import { FloatingLabelInput } from 'react-native-floating-label-input'

const ProfileScreen = ({ }) => {

	const { user } = useContext(AuthContext);
	const [listen, setListen] = useState(true)
	const [value, setValue] = useState({
		firstName: '',
		lastName: '',
		mobile: '',
	})

	const ref = Firebase.database().ref(`Admin/${user.uid}`);
	ref.on('value', function (snapshot) {
		if (listen) {
			setValue({
				firstName: snapshot.val().firstName,
				lastName: snapshot.val().lastName,
				mobile: snapshot.val().mobile,
			})
			setListen(false);
		}
	})


	function saveUser() {
		console.log(value.firstName, value.lastName, value.mobile)
		if (value.firstName.length == 0 || value.lastName.length == 0) {
			alert("Empty Name");
		} else if (value.mobile.length < 10) {
			alert("Invalid number");
		} else {
			Firebase.database().ref(`/Admin/${user.uid}`).update({
				firstName: value.firstName,
				lastName: value.lastName,
				mobile: value.mobile,
			}, Toast.show("Successfully Updated", Toast.SHORT))
		}
	}

	const colors = {

		background: '#333333',
		text: '#333333'
	}

	return (
		<TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
			<View style={{ flex: 1 }}>
				<StatusBar style="light" />
				<View style={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1, }}>

					<Text style={{ marginTop: -100, marginBottom: 40, fontSize: 30, fontWeight: 'bold' }}>
						Edit Your Profile </Text>

					<View style={{ marginVertical: 10, width: '90%' }}>
						<FloatingLabelInput
							padding={5}
							label={'First Name'}
							value={value.firstName}
							blurOnSubmit={true}
							autoCorrect={false}
							leftComponent={
								<FontAwesome name="user-o" color={colors.text} size={20} />
							}
							onChangeText={(val) => setValue({ ...value, firstName: val })}
						/>
					</View>
					<View style={{ marginVertical: 10, width: '90%' }}>
						<FloatingLabelInput
							label={'Last Name'}
							padding={5}
							value={value.lastName}
							blurOnSubmit={true}
							autoCorrect={false}
							leftComponent={
								<FontAwesome name="user-o" color={colors.text} size={20} />
							}
							onChangeText={(val) => setValue({ ...value, lastName: val })} />
					</View>

					<View style={{ marginVertical: 10, width: '90%' }}>
						<FloatingLabelInput
							label={'Mobile'}
							value={value.mobile}
							blurOnSubmit={true}
							padding={5}
							keyboardType={'number-pad'}
							leftComponent={
								<Feather name="phone" color={colors.text} size={20} />
							}
							onChangeText={(val) => setValue({ ...value, mobile: val })} />
					</View>

				</View>

				<TouchableOpacity style={styles.saveButton} onPress={() => { saveUser(); Keyboard.dismiss(); }} >
					<Text style={{ fontSize: 18, color: 'white' }}>Save Changes</Text>
				</TouchableOpacity>
			</View>
		</TouchableWithoutFeedback>

	);

};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 50,
	},
	saveButton: {
		padding: 15,
		elevation: 10,
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
		backgroundColor: 'black',
		alignItems: 'center',
	},
});