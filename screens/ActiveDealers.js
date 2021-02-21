import RegisteredDealers from '../screens/RegisteredDealers';
import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import InsideRegDea from "../screens/InsideRegDea";


const Stack = createStackNavigator();

export default function ActiveDealers({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{
            headerShown:false,
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center'
            },
        }}>
            <Stack.Screen name="Dealers" component={RegisteredDealers} options={{
                title: 'Dealers',
                headerStyle: {
                    backgroundColor: '#223240'
                },
            }} />
            <Stack.Screen name="InsideRegDea" component={InsideRegDea} 
            options={{
                title: 'Dealers Details',
                headerStyle: {
                    backgroundColor: '#223240'
                },
            }}
             />
        </Stack.Navigator>
    )

}