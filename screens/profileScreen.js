import React,{useContext, useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../navigation/AuthProvider';
import { View, Text, TouchableOpacity, ImageBackground, TextInput, StyleSheet, SafeAreaView, ToastAndroid, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { StatusBar } from 'expo-status-bar';
import Firebase from '../firebaseConfig'
import HomeScreen from './HomeScreen'

const ProfileScreen = ({navigation}) => {

	// constructor(props)
	// {
	//   super(props);

	//   this.state = {
	//     fname : 'First Name',
	//     lname : 'Last Name',
	//     phone : 'Phone',
	//     city : 'City'
	//   };
	//   if (!firebase.apps.length) {
	//     firebase.initializeApp(ApiKeys.firebaseConfig);
	// }
	// }


	// componentDidMount() {
	//   let dbRef = firebase.database().ref('currentUser');
	//   if (dbRef) {
	//     dbRef.on('value', (data) => {

	//       var temp = data.val();

	//       this.setState({
	//           fname : temp.fname,
	//           lname : temp.lname,
	//           phone : temp.phone,
	//           city : temp.city,
	//           token : temp.token,
	//           email : temp.email,
	//           password : temp.password,
	//           type : temp.type,
	//       });

	//   })
	//   }

	//   // console.log(this.state.email+":"+this.state.pwd);

	// }

	// saveUser = () =>
	// {

	//   var currUser = {

	//     fname : this.state.fname,
	//     lname : this.state.lname,
	//     phone : this.state.phone,
	//     city : this.state.city,
	//     token : this.state.token,
	//     email : this.state.email,
	//     password : this.state.password,
	//     type : this.state.type,
	//   };

	//   console.log("Current user : ::: "+ currUser);

	//   firebase.database().ref('currentUser').set(currUser).then(() => {
	//   }).catch((error) => {
	//     console.log(error);
	//   });

	//   firebase.database().ref('UserProfiles'+"/"+currUser.token).set(currUser).then(() => {
	//   }).catch((error) => {
	//     console.log(error);
	//   });

	// }

	const { user } = useContext(AuthContext);

	// Firebase.database().ref(`/Admin/${user.uid}`)
	// .on('value',snapshot => console.log("User data: ",user))

		const [value, setValue] = useState({
			firstName: "", //Firebase.database().ref(`/Admin/${user.uid}/firstName`),
			lastName : "", //Firebase.database().ref(`/Admin/${user.uid}/lastName`),
			mobile: "", //Firebase.database().ref(`/Admin/${user.uid}/mobile`),
		})

		function saveUser() {
			console.log(value.firstName,value.lastName,value.mobile)
			if (value.firstName.length==0 || value.lastName.length==0) {
				alert("Empty Name");
			}else if (value.mobile.length<10) {
				alert("Invalid number");
			}else{
				Firebase.database().ref(`/Admin/${user.uid}`).update({
					firstName:value.firstName,
					lastName:value.lastName,
					mobile:value.mobile,
				},ToastAndroid.show("Successfully Updated",ToastAndroid.SHORT))
			}
		}

		const colors = {

			background: '#333333',
			text: '#333333'
		}

		return (
			<View style={styles.container}>
				<StatusBar style="light" />
				<View style={{ alignItems: 'center' }}>
					<TouchableOpacity onPress={() => { }}>
						<View
							style={{
								height: 100,
								width: 100,
								borderRadius: 15,
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<ImageBackground
								source={{
									uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
								}}
								style={{ height: 100, width: 100 }}
								imageStyle={{ borderRadius: 15 }}>

							</ImageBackground>
						</View>
					</TouchableOpacity>
					<Text style={{ marginTop: 10, marginBottom: 10, fontSize: 18, fontWeight: 'bold' }}>
						Edit Your Profile
          </Text>
				</View>

				<View style={styles.action}>
					<FontAwesome name="user-o" color={colors.text} size={20} />
					<TextInput
						placeholder="First Name" //{value.firstName.toString}
						blurOnSubmit={true}
						//text={value.firstName}
						placeholderTextColor="#666666"
						autoCorrect={false}
						style={[
							styles.textInput,
							{
								color: colors.text,
							},
						]}
						//value={value.firstName}
					 onChangeText={(val) => setValue({ ...value,firstName:val})}
					/>
				</View>
				<View style={styles.action}>
					<FontAwesome name="user-o" color={colors.text} size={20} />
					<TextInput
						placeholder="Last Name" //{value.lastName.toString}
						placeholderTextColor="#666666"
						blurOnSubmit={true}
						autoCorrect={false}
						style={[
							styles.textInput,
							{
								color: colors.text,
							},
						]}
						//value={value.lastName}
					 onChangeText={(val) => setValue({...value,lastName:val})}


					/>
				</View>
				<View style={styles.action}>
					<Feather name="phone" color={colors.text} size={20} />
					<TextInput
						placeholder="Phone" //{value.mobile.toString}
						placeholderTextColor="#666666"
						keyboardType="number-pad"
						autoCorrect={false}
						blurOnSubmit={true}
						style={[
							styles.textInput,
							{
								color: colors.text,
							},
						]}
						//value={value.mobile}
					 onChangeText={(val) => setValue({...value,mobile:val})}

					/>
				</View>

				{/* <View style={styles.action}>
					<Icon name="map-marker-outline" color={colors.text} size={20} />
					<TextInput
						placeholder="City"
						placeholderTextColor="#666666"
						autoCorrect={false}
						style={[
							styles.textInput,
							{
								color: colors.text,
							},
						]}

					// value={this.state.city}
					// onChangeText={(val) => this.setState({city:val})}


					/>
				</View> */}
				<TouchableOpacity style={styles.commandButton} onPress={() => {saveUser()}} >
					<Text style={styles.panelButtonTitle}>Save Changes</Text>
				</TouchableOpacity>
				{/* </Animated.View> */}
			</View>

		);

};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 50,

	},
	commandButton: {
		padding: 15,
		borderRadius: 10,
		backgroundColor: '#ec2F4B',
		alignItems: 'center',
		marginTop: 10,
	},
	panel: {
		padding: 20,
		backgroundColor: '#FFFFFF',
		paddingTop: 20,
		// borderTopLeftRadius: 20,
		// borderTopRightRadius: 20,
		// shadowColor: '#000000',
		// shadowOffset: {width: 0, height: 0},
		// shadowRadius: 5,
		// shadowOpacity: 0.4,
	},
	header: {
		backgroundColor: '#FFFFFF',
		shadowColor: '#333333',
		shadowOffset: { width: -1, height: -3 },
		shadowRadius: 2,
		shadowOpacity: 0.4,
		// elevation: 5,
		paddingTop: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	panelHeader: {
		alignItems: 'center',
	},
	panelHandle: {
		width: 40,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#00000040',
		marginBottom: 10,
	},
	panelTitle: {
		fontSize: 27,
		height: 35,
	},
	panelSubtitle: {
		fontSize: 14,
		color: 'gray',
		height: 30,
		marginBottom: 10,
	},
	panelButton: {
		padding: 13,
		borderRadius: 10,
		backgroundColor: '#FF6347',
		alignItems: 'center',
		marginVertical: 7,
	},
	panelButtonTitle: {
		fontSize: 17,
		fontWeight: 'bold',
		color: 'white',
	},
	action: {
		flexDirection: 'row',
		marginTop: 15,
		marginBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#f2f2f2',
		paddingBottom: 5,
		paddingLeft: 15
	},
	actionError: {
		flexDirection: 'row',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#FF0000',
		paddingBottom: 5,
	},
	textInput: {
		flex: 1,
		marginTop: Platform.OS === 'ios' ? 0 : -4,
		paddingLeft: 10,
		color: '#05375a',
	},
});