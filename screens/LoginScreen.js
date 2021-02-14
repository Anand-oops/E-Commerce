import React, { useState, useContext, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { windowWidth } from '../shared/Dimensions';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../navigation/AuthProvider';
import { StatusBar } from 'expo-status-bar';
import Firebase from '../firebaseConfig';
import Entypo from 'react-native-vector-icons/Entypo'
import RBSheet from 'react-native-raw-bottom-sheet';
import Toast from 'react-native-simple-toast';
import firebase from 'firebase';

const LoginScreen = ({ navigation }) => {

	const { login } = useContext(AuthContext);
	const [call, setCall] = useState(true)
	const [adminUsers, setAdminUsers] = useState([])
	const [data, setData] = useState({
		email: '',
		password: '',
		securityStatus: true,
	});

	const resetPassSheet = useRef();

	const [forgotEmail, setForgotEmail] = useState('')

	const updateSecurityStatus = () => {
		setData({
			...data,
			securityStatus: !data.securityStatus
		});
	}

	Firebase.database().ref('Admin/').on('value', snapshot => {
		if (call) {
			if (snapshot.val()) {
				var list = []
				var keys = Object.keys(snapshot.val())
				for (var i = 0; i < keys.length; i++) {
					var key = keys[i]
					list.push(snapshot.val()[key].email)
				}
				setAdminUsers(list);
			}
			setCall(false);
		}

	})

	function loginWithEmail() {
		if (data.email.length <= 4) {
			Alert.alert("Credentials error",
				"Invalid E-mail",
				[
					{ text: "Retry" }
				], { cancelable: false });
		}
		else if (data.password < 6) {
			Alert.alert("Credentials error",
				"Password should be at least 6 characters",
				[
					{ text: "Retry" }
				], { cancelable: false });
		}
		else {
			const index = adminUsers.findIndex((email) => email === data.email)
			if (index === -1) {
				Alert.alert("Login Error !",
					"No Admin account linked with this email. Try Signing In...",
					[
						{ text: "OK" }
					], { cancelable: false });
			} else
				login(data.email, data.password);
		}
	}

	function forgotPass() {
		if (forgotEmail.length == 0) {
			Toast.show("Enter email first..", Toast.SHORT);
		} else {
			resetPassSheet.current.close();
			firebase.auth().sendPasswordResetEmail(forgotEmail).then(function () {
				alert("Check your email...")
			}).catch((error) => {
				console.log(error);
				alert(error)
			});
		}
	}

	return (
		<TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
			<View style={styles.container}>

				<StatusBar style="auto" />

				<LinearGradient
					colors={['#20527e', '#f08080']}
					style={{ flex: 1 }}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }} >



					<View style={styles.foreground}>
						<View style={{ flexDirection: 'row' }} >
							<FontAwesome
								style={{ padding: 10, marginVertical: 5 }}
								name="user-circle-o"
								size={24}
								color='red' />

							<View style={styles.inputView} >
								<TextInput
									style={styles.inputText}
									placeholder=" Enter Email"
									keyboardType="email-address"
									autoCapitalize="none"
									autoCorrect={false}
									placeholderTextColor='#dcdcdc'
									onChangeText={(entry) => setData({
										...data, email: entry
									})}
								/>
							</View>
						</View>

						<View style={{ flexDirection: 'row' }} >
							<MaterialIcons
								style={{ padding: 10, marginVertical: 5 }}
								name="security"
								size={24}
								color="red" />

							<View style={styles.inputView} >
								<TextInput
									style={styles.inputText}
									placeholder="Enter Password"
									placeholderTextColor='#dcdcdc'
									autoCapitalize="none"
									autoCorrect={false}
									secureTextEntry={data.securityStatus ? true : false}
									onChangeText={(entry) => setData({
										...data, password: entry
									})}
								/>
								<TouchableOpacity onPress={updateSecurityStatus}>
									{data.securityStatus ?
										<FontAwesome5
											style={{ marginTop: 10 }}
											name="eye-slash"
											color="#e0e0e0"
											size={20}
										/>
										:
										<FontAwesome5
											style={{ marginTop: 10 }}
											name="eye"
											color="#e0e0e0"
											size={20}
										/>}
								</TouchableOpacity>
							</View>

						</View>

						<TouchableOpacity>
							<Text onPress={() => resetPassSheet.current.open()}
								style={{ color: 'red', textAlign: 'right', marginRight: '15%', fontSize: 16, fontWeight: 'bold' }}>
								Forgot password?</Text>

							<RBSheet
								ref={resetPassSheet}
								closeOnDragDown={true}
								closeOnPressMask={true}
								height={300}
								animationType='fade'
								customStyles={{
									container: {
										backgroundColor: '#778899'
									},
									wrapper: {
										backgroundColor: 'rgba(52, 52, 52, 0.8)',
									},
									draggableIcon: {
										backgroundColor: "#000"
									}
								}}
							>
								<View style={{ marginTop: 20, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
									<MaterialCommunityIcons name='lock-reset' size={40} color={'black'} style={{ alignSelf: 'center' }} />
									<Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, marginTop: 10, textAlign: 'center' }}>Reset Password</Text>

									<View style={{ flexDirection: 'row' }} >
										<Entypo
											style={{ padding: 10, marginVertical: 10 }}
											name="email"
											size={24}
											color='red' />

										<View style={styles.inputView} >
											<TextInput
												style={styles.inputText}
												placeholder=" Enter Email"
												keyboardType="email-address"
												autoCapitalize="none"
												autoCorrect={false}
												placeholderTextColor='#dcdcdc'
												onChangeText={(entry) => setForgotEmail(entry)}
											/>
										</View>
									</View>

									<TouchableOpacity
										style={{
											marginTop: 20,
											paddingTop: 10,
											paddingBottom: 10,
											backgroundColor: 'red',
											borderRadius: 100,
											width: '40%',
										}}
										onPress={() => { Keyboard.dismiss(), forgotPass() }}
										underlayColor='#fff'>
										<Text style={{
											color: 'white',
											textAlign: 'center',
											paddingLeft: 10,
											fontWeight: 'bold',
											paddingRight: 10,
											fontSize: 14
										}}>Reset</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={() => resetPassSheet.current.close()}>
										<Text style={{ borderBottomWidth: 1, marginTop: 15 }}>Cancel</Text>
									</TouchableOpacity>
								</View>
							</RBSheet>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.loginButton}
							onPress={() => { Keyboard.dismiss(); console.log(data.email, data.password); loginWithEmail() }} >
							<Text style={styles.loginText}>LOGIN</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.signUpButton}
							onPress={() => navigation.navigate('SignUpScreen')}
							underlayColor='#fff'>
							<Text style={styles.signUpText}>New here?  SIGN UP.</Text>
						</TouchableOpacity>

						<Text
							style={{ color: 'white', marginTop: 40, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>
							Sign in with your social account : </Text>

						<View style={{
							flexDirection: 'row',
							justifyContent: 'space-around',
						}}>
							<TouchableOpacity
								style={styles.socialButton}
								//onPress={}
								underlayColor='#fff'>

								<View style={{ flexDirection: 'row' }}>
									<FontAwesome
										name="facebook-square"
										color="blue"
										size={20} />

									<Text style={styles.socialText}>Facebook</Text>
								</View>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.socialButton}
								//onPress={() => googleLogin()}
								underlayColor='#fff'>

								<View style={{ flexDirection: 'row' }}>
									<FontAwesome
										name="google"
										color="red"
										size={20} />

									<Text style={styles.socialText}>Google</Text>
								</View>
							</TouchableOpacity>

						</View>
					</View>
				</LinearGradient>
			</View>
		</TouchableWithoutFeedback>
	);
}

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: windowWidth,
		justifyContent: 'center'
	},
	foreground: {
		marginTop: '50%',
		marginLeft: '4%',
	},
	inputView: {
		flexDirection: 'row',
		width: '75%',
		borderBottomWidth: 1,
		borderBottomLeftRadius: 5,
		borderColor: '#dcdcdc',
		paddingVertical: 5,
		marginBottom: 20,
	},
	inputText: {
		flex: 1,
		padding: 5,
		color: 'white',
		fontSize: 16,

	},
	loginButton: {
		alignContent: 'center',
		marginHorizontal: 40,
		marginTop: 30,
		elevation: 20,
		paddingVertical: 10,
		backgroundColor: 'red',
		borderRadius: 100,
		borderWidth: 1,
		borderColor: '#C62828',
		width: '75%',
	},
	loginText: {
		color: '#fff',
		textAlign: 'center',
		paddingLeft: 10,
		fontWeight: 'bold',
		paddingRight: 10
	},
	signUpButton: {
		marginHorizontal: 40,
		marginTop: 20,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: 'transparent',
		borderRadius: 100,
		borderWidth: 2,
		borderColor: 'white',
		width: '75%',
	},
	signUpText: {
		color: 'white',
		textAlign: 'center',
		paddingLeft: 10,
		fontWeight: 'bold',
		paddingRight: 10
	},
	socialButton: {
		backgroundColor: 'white',
		marginTop: 20,
		padding: 10,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: 'white',
		elevation: 25,
		width: 125,
		//marginHorizontal:20,
	},
	socialText: {
		flex: 1,
		elevation: 10,
		color: 'gray',
		textAlign: 'center',
		fontWeight: 'bold',
		paddingRight: 10
	}
});

