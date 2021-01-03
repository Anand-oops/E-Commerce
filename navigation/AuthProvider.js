import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import * as GoogleSignIn from 'expo-google-sign-in';
import Firebase from '../firebaseConfig';



export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);


	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,

				login: async (email, password) => {
					try {
						await Firebase.auth().signInWithEmailAndPassword(email, password);
					} catch (e) {
						Alert.alert(
							"Authentication Error",
							"Password incorrect or User not registered",
							[
								{ text: "OK", onPress: () => console.log("OK Pressed") }
							],
							{ cancelable: false }
						);
					}
				},
				register: async (email, password) => {
					try {
						await Firebase.auth().createUserWithEmailAndPassword(email, password)
					} catch (e) {
						console.log("error" + e);
					}
				},
				logout: async () => {
					try {
						await Firebase.auth().signOut();
					} catch (e) {
						console.log(e);
					}
				},
				googleLogin: async () => {
					try {
						const {type, result} = await GoogleSignIn.signInAsync({
							androidClientId: '401682790263-al3cr5tdl1n0ht73fab8r46u91bkoii8.apps.googleusercontent.com',
							scopes: ['profile', 'email']
						});
						
							if (type === 'success') {
								console.log("user");
							}
						} catch (e) {
						console.log(e);
						Alert.alert(
							"Google Error",
							{ e },
							[
								{ text: "OK", onPress: () => console.log("OK Pressed") }
							],
							{ cancelable: false }
						);
					}
				}
			}}>
			{children}
		</AuthContext.Provider>
	);
};