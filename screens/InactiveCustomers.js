import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";
import React from 'react';
import RegisteredCustomers from '../screens/RegisteredCustomers';


const Stack = createStackNavigator();

export default function InactiveCustomers({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{
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
                    backgroundColor: 'black'
                },
                // headerTitle: () => (
                //     <View style={{ height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                //         <Entypo name="menu" size={24} color="white" onPress={() => navigation.openDrawer()} style={{ position: 'absolute', left: 3 }} />
                //         <View>
                //             <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Customers</Text>
                //         </View>
                //     </View>
                // ),
            }} 
            />


        </Stack.Navigator>
    )

}