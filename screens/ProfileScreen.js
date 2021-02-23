import React, { useContext, useState } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { View, Text, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-simple-toast'
import Firebase from '../firebaseConfig'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { FloatingLabelInput } from 'react-native-floating-label-input'

const ProfileScreen = ({ navigation }) => {

	const { user } = useContext(AuthContext);
	const [listen, setListen] = useState(true)
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [mobile,setMobile] = useState('')
	const [city,setCity] = useState('')
	const [AccountNumber,setAccountNumber] = useState('')
	const [IfscCode, setIfscCode] = useState('')

	const ref = Firebase.database().ref(`Admin/${user.uid}`);
	ref.on('value', function (snapshot) {
		if (listen) {
			console.log("Snapshot", snapshot.val())
			if (snapshot.val().firstName)
				setFirstName(snapshot.val().firstName)
			if (snapshot.val().lastName)
				setLastName(snapshot.val().lastName)
			if (snapshot.val().mobile)
				setMobile(snapshot.val().mobile)
			if (snapshot.val().city)
				setCity(snapshot.val().city)
			if (snapshot.val().AccountNumber)
				setAccountNumber(snapshot.val().AccountNumber)
			if (snapshot.val().IfscCode)
				setIfscCode(snapshot.val().IfscCode)
			setListen(false);
		}
	})


	function saveUser() {
		if (firstName.length == 0 || lastName.length == 0) {
			Toast.show("Enter Full Name", Toast.SHORT);
		} else if (mobile.length < 10) {
			Toast.show("Enter 10 digit number", Toast.SHORT);
		} else {
			Firebase.database().ref(`/Admin/${user.uid}`).update({
				firstName: firstName,
				lastName: lastName,
				mobile: mobile,
				city: city,
				AccountNumber: AccountNumber,
				IfscCode: IfscCode
			}, Toast.show("Successfully Updated", Toast.SHORT))
			navigation.goBack();
		}
	}


	return (
		<TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
			<View style={{ flex: 1, backgroundColor: '#a6b8ca' }}>
				<StatusBar style="light" />
				<View style={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1, }}>

					<Text style={{ marginBottom: 40, fontSize: 30, fontWeight: 'bold' }}>
						Edit Your Profile </Text>

					<View style={{ marginVertical: 10, width: '90%' }}>
						<FloatingLabelInput
							padding={6}
							fontSize={18}
							label={'First Name'}
							value={firstName}
							blurOnSubmit={true}
							autoCorrect={false}
							leftComponent={
								<FontAwesome name="user-o" color={'purple'} size={20} />
							}
							onChangeText={(val) => setFirstName(val)}
						/>
					</View>
					<View style={{ marginVertical: 10, width: '90%' }}>
						<FloatingLabelInput
							label={'Last Name'}
							padding={6}
							fontSize={18}
							value={lastName}
							blurOnSubmit={true}
							autoCorrect={false}
							leftComponent={
								<FontAwesome name="user-o" color={'purple'} size={20} />
							}
							onChangeText={(val) => setLastName(val)} />
					</View>

					<View style={{ marginVertical: 10, width: '90%' }}>
						<FloatingLabelInput
							label={'Mobile'}
							value={mobile}
							blurOnSubmit={true}
							padding={6}
							fontSize={18}
							maxLength={10}
							keyboardType={'number-pad'}
							leftComponent={
								<Feather name="phone" color={'purple'} size={20} />
							}
							onChangeText={(val) => setMobile(val)} />
					</View>

					<View style={{ marginVertical: 10, width: '90%' }}>
						<FloatingLabelInput
							label={'City'}
							value={city}
							blurOnSubmit={true}
							padding={6}
							fontSize={18}
							autoCapitalize={'words'}
							leftComponent={
								<FontAwesome5 name="city" color={'purple'} size={20} />
							}
							onChangeText={(val) => setCity(val)} />
					</View>
					<View style={{ marginVertical: 10, width: '90%' }}>
						<FloatingLabelInput
							label={'Account Number'}
							value={AccountNumber}
							blurOnSubmit={true}
							padding={6}
							fontSize={18}
							keyboardType='number-pad'
							autoCapitalize={'words'}
							leftComponent={
								<FontAwesome name="bank" color={'purple'} size={20} />
							}
							onChangeText={(val) => setAccountNumber(val)} />
					</View>
					<View style={{ marginVertical: 10, width: '90%' }}>
						<FloatingLabelInput
							label={'Ifsc Code'}
							value={IfscCode}
							blurOnSubmit={true}
							padding={6}
							fontSize={18}
							autoCapitalize={'words'}
							leftComponent={
								<FontAwesome name="qrcode" color={'purple'} size={20} />
							}
							onChangeText={(val) => setIfscCode(val)} />
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
		backgroundColor: '#000a1a',
		alignItems: 'center',
	},
});
