import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";
import { Entypo } from '@expo/vector-icons';
import Home from '../screens/HomeScreen';

import React from 'react';

const Stack = createStackNavigator();
export default function AppStack({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center'
            },
        }}>
            <Stack.Screen name="Home" component={Home} options={{
                title: 'Home',
                headerStyle: {
                    backgroundColor: '#223240'
                },
                headerTitle: () => (
                    <View style={{ height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Entypo name="menu" size={24} color="white" onPress={() => navigation.openDrawer()} style={{ position: 'absolute', left: 3 }} />
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Home</Text>
                        </View>

                    </View>
                )
            }} />
        </Stack.Navigator>
    )

}
