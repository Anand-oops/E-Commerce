import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import RegisteredCustomers from '../screens/RegisteredCustomers';
import InsideRegCus from "../screens/InsideRegCus";


const Stack = createStackNavigator();

export default function ActiveCustomers({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{
            headerShown:false,
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center'
            },
        }}>
            <Stack.Screen name="Customers" component={RegisteredCustomers} 
            options={{
                title: 'Customers',
                headerStyle: {
                    backgroundColor: '#223240'
                },
            }}
             />
             <Stack.Screen name="InsideRegCus" component={InsideRegCus} 
            options={{
                title: 'Customers Details',
                headerStyle: {
                    backgroundColor: '#223240'
                },
            }}
             />

        </Stack.Navigator>
    )

}