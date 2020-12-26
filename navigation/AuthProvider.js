import React, {createContext, useState} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth'
import * as Google from 'expo-google-app-auth'
import Firebase from '../firebaseConfig'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
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
            console.log(e);
            Alert.alert(
                  "Login Authentication Error",
                  {e},
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
            console.log("error"+e);
            Alert.alert(
                  "Signup Authentication Error",
                  {e},
                  [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                  ],
                  { cancelable: false }
                );
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
          try{
            await Google.logInAsync({
              webClientId:"401682790263-al3cr5tdl1n0ht73fab8r46u91bkoii8.apps.googleusercontent.com"
            })
          }catch (e){
            console.log(e);
            Alert.alert(
                  "Google Error",
                  {e},
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