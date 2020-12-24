import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import KenBurnsView from 'react-native-kenburns-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const LoginScreen = () => {

	const [data, setData] = React.useState({
		email: '',
		password: '',
		securityStatus: true,
	});

	const updateSecurityStatus = () => {
		setData({
			...data,
			securityStatus: !data.securityStatus
		});
	}


	return (
		<View style={styles.container}>
			<KenBurnsView tension={4} friction={50}
				sourceUri={require('../assets/grad.png')} imageHeight={Dimensions.get("window").height}
				imageWidth={Dimensions.get("window").width} />

			<View style={styles.foreground}>
				<View style={{ flexDirection: 'row' }} >
					<FontAwesome
						style={{ padding: 10, marginVertical: 5 }}
						name="user-circle-o"
						size={30}
						color='#ef5350' />

					<View style={styles.inputView} >
						<TextInput
							style={styles.inputText}
							placeholder="Email"
							placeholderTextColor='grey'
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
						size={30}
						color="#ef5350" />

					<View style={styles.inputView} >
						<TextInput
							style={styles.inputText}
							placeholder="Password"
							placeholderTextColor='grey'
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
					<Text
						style={{ color: '#ef5350', textAlign: 'right', marginRight: '15%', fontSize: 16, fontWeight: 'bold' }}>
						Forgot password?</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.loginButton}
				//onPress={}
				>
					<Text style={styles.loginText}>LOGIN</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.signUpButton}
					//onPress={}
					underlayColor='#fff'>
					<Text style={styles.signUpText}>New here?  SIGN UP.</Text>
				</TouchableOpacity>

				<Text
					style={{ color: 'white', marginTop: 30, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>
					Sign in with your social account : </Text>

				<View style={{
					flex: 0,
					flexDirection: 'row',
					justifyContent: 'space-evenly'
				}}>
					<TouchableOpacity
						style={styles.socialButton}
						//onPress={}
						underlayColor='#fff'>

						<View style={{ flexDirection: 'row' }}>
							<FontAwesome
								name="facebook-square"
								color="#ef5350"
								size={20} />

							<Text style={styles.socialText}>Facebook</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.socialButton}
						//onPress={}
						underlayColor='#fff'>

						<View style={{ flexDirection: 'row' }}>
							<FontAwesome
								name="google-plus-square"
								color="#ef5350"
								size={20} />

							<Text style={styles.socialText}>Google</Text>
						</View>
					</TouchableOpacity>

				</View>
			</View>
		</View>
	);
}

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
	},
	foreground: {
		position: 'absolute',
		marginHorizontal: '5%',
		zIndex: 1,
	},
	inputView: {
		flexDirection: 'row',
		maxWidth: 300,
		width: '75%',
		borderBottomWidth: 1,
		borderBottomLeftRadius: 5,
		borderColor: '#dcdcdc',
		paddingVertical: 10,
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
		backgroundColor: '#C62828',
		borderRadius: 100,
		borderWidth: 1,
		borderColor: '#C62828',
		width: 300,
	},
	loginText: {
		color: '#fff',
		textAlign: 'center',
		paddingLeft: 10,
		fontWeight: 'bold',
		paddingRight: 10
	},
	signUpButton: {
		elevation: 10,
		marginHorizontal: 40,
		marginTop: 20,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: 'transparent',
		borderRadius: 100,
		borderWidth: 2,
		borderColor: 'white',
		width: 300,
	},
	signUpText: {
		color: 'white',
		textAlign: 'center',
		paddingLeft: 10,
		fontWeight: 'bold',
		paddingRight: 10
	},
	socialButton: {
		marginTop: 20,
		padding: 10,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: 'white',
		elevation: 10,
		width: 125
	},
	socialText: {
		flex: 1,
		elevation: 10,
		color: 'white',
		textAlign: 'center',
		fontWeight: 'bold',
		paddingHorizontal: 10
	}
});

