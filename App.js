import React from 'react';
import { StyleSheet, Text, Image, View, Dimensions, StatusBar, TextInput} from 'react-native';
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from "./screens/SignUpScreen";


export default function App() {
  return (
    <View >
      {/* <SignUpScreen/> */}
      <LoginScreen/>
   </View>
  );
}