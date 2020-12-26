import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'

const Stack = createStackNavigator();

// GoogleSignin.configure({
//     webClientId: '401682790263-al3cr5tdl1n0ht73fab8r46u91bkoii8.apps.googleusercontent.com',
// })

const AuthStack = () =>(
    <Stack.Navigator  headerMode={null} >
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
);

export default AuthStack;