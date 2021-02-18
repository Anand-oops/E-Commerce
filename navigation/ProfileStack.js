import { createStackNavigator } from "@react-navigation/stack";
import { View,Text } from "react-native";
import { Entypo } from '@expo/vector-icons';
import Header from '../shared/Header';
import React from 'react';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileDisplayScreen from '../screens/ProfileDisplayScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen'
import ChangeEmailScreen from "../screens/ChangeEmailScreen";


const Stack = createStackNavigator();

export default function profileStack({navigation}){
return(
    <Stack.Navigator screenOptions={{
		headerTintColor: 'white',
		headerTitleStyle: {
			fontWeight: 'bold',
			alignSelf: 'center'
		},
	}}>
		<Stack.Screen name="ProfileDisplay" component={ProfileDisplayScreen} options={{
			title: 'Profile',
			headerStyle: {
				backgroundColor: 'black'
			},
			headerTitle: () => (
				<View style={{ height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
					<Entypo name="menu" size={24} color="white" onPress={() => navigation.openDrawer()} style={{ position: 'absolute', left: 3 }} />
					<View>
						<Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Profile</Text>
					</View>
				</View>
			),
		}} />

		<Stack.Screen name="Edit Profile" component={ProfileScreen} options={{
			title: 'Edit Profile',
			headerStyle: {
				backgroundColor: 'black'
			},
			headerTitle: () => (
				<View style={{ height: '100%', width: '100%', flexDirection: 'row'}}>

					<View>
						<Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Edit Profile</Text>
					</View>

				</View>
			),
		}} />

		<Stack.Screen name="Change Email" component={ChangeEmailScreen} options={{
			title: 'Change Email',
			headerStyle: {
				backgroundColor: 'black'
			},
			headerTitle: () => (
				<View style={{ height: '100%', width: '100%', flexDirection: 'row'}}>

					<View>
						<Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Change Email</Text>
					</View>
					

				</View>
			),
		}} />

		<Stack.Screen name="Change Password" component={ChangePasswordScreen} options={{
			title: 'Change Password',
			headerStyle: {
				backgroundColor: 'black'
			},
			headerTitle: () => (
				<View style={{ height: '100%', width: '100%', flexDirection: 'row'}}>

					<View>
						<Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Change Password</Text>
					</View>
					

				</View>
			),
		}} />

	</Stack.Navigator>
)

}
