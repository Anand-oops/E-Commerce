import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'

const Stack = createStackNavigator();

const AuthStack = () =>(
    <Stack.Navigator  headerMode={null} >
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
);

export default AuthStack;