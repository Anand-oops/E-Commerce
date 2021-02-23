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
	const [value, setValue] = useState({
		firstName: '',
		lastName: '',
		mobile: '',
		city: '',
		AccountNumber: '',
		IfscCode: ''
	})

	const ref = Firebase.database().ref(`Admin/${user.uid}`);
	ref.on('value', function (snapshot) {
		if (listen) {
			console.log("Snapshot", snapshot.val())
			if (snapshot.val().firstName)
				setValue({ firstName: snapshot.val().firstName })
			if (snapshot.val().lastName)
				setValue({ lastName: snapshot.val().lastName })
			if (snapshot.val().mobile)
				setValue({ mobile: snapshot.val().mobile })
			if (snapshot.val().city)
				setValue({ city: snapshot.val().city })
			if (snapshot.val().AccountNumber)
				setValue({ AccountNumber: snapshot.val().AccountNumber })
			if (snapshot.val().IfscCode)
				setValue({ IfscCode: snapshot.val().IfscCode })
			setListen(false);
		}
	})


	function saveUser() {
		console.log("Value",value)
		if (!value.firstName || !value.lastName ) {
			Toast.show("Enter Full Name", Toast.SHORT);
		} else if (value.mobile == '' || value.mobile.length < 10) {
			Toast.show("Enter 10 digit number", Toast.SHORT);
		} else {
			Firebase.database().ref(`/Admin/${user.uid}`).update({
				firstName: value.firstName,
				lastName: value.lastName,
				mobile: value.mobile,
				city: value.city,
				AccountNumber: value.AccountNumber,
				IfscCode: value.IfscCode
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
							value={value.firstName}
							blurOnSubmit={true}
							autoCorrect={false}
							leftComponent={
								<FontAwesome name="user-o" color={'purple'} size={20} />
							}
							onChangeText={(val) => setValue({ ...value, firstName: val })}
						/>
					</View>
					<View style={{ marginVertical: 10, width: '90%' }}>
						<FloatingLabelInput
							label={'Last Name'}
							padding={6}
							fontSize={18}
							value={value.lastName}
							blurOnSubmit={true}
							autoCorrect={false}
							leftComponent={
								<FontAwesome name="user-o" color={'purple'} size={20} />
							}
							onChangeText={(val) => setValue({ ...value, lastName: val })} />
					</View>

					<View style={{ marginVertical: 10, width: '90%' }}>
						<FloatingLabelInput
							label={'Mobile'}
							value={value.mobile}
							blurOnSubmit={true}
							padding={6}
							fontSize={18}
							maxLength={10}
							keyboardType={'number-pad'}
							leftComponent={
								<Feather name="phone" color={'purple'} size={20} />
							}
							onChangeText={(val) => setValue({ ...value, mobile: val })} />
					</View>

					<View style={{ marginVertical: 10, width: '90%' }}>
						<FloatingLabelInput
							label={'City'}
							value={value.city}
							blurOnSubmit={true}
							padding={6}
							fontSize={18}
							autoCapitalize={'words'}
							leftComponent={
								<FontAwesome5 name="city" color={'purple'} size={20} />
							}
							onChangeText={(val) => setValue({ ...value, city: val })} />
					</View>
					<View style={{ marginVertical: 10, width: '90%' }}>
						<FloatingLabelInput
							label={'Account Number'}
							value={value.AccountNumber}
							blurOnSubmit={true}
							padding={6}
							fontSize={18}
							autoCapitalize={'words'}
							leftComponent={
								<FontAwesome name="bank" color={'purple'} size={20} />
							}
							onChangeText={(val) => setValue({ ...value, AccountNumber: val })} />
					</View>
					<View style={{ marginVertical: 10, width: '90%' }}>
						<FloatingLabelInput
							label={'Ifsc Code'}
							value={value.IfscCode}
							blurOnSubmit={true}
							padding={6}
							fontSize={18}
							autoCapitalize={'words'}
							leftComponent={
								<FontAwesome name="qrcode" color={'purple'} size={20} />
							}
							onChangeText={(val) => setValue({ ...value, IfscCode: val })} />
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
