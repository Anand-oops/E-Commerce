import RegisteredDealers from '../screens/RegisteredDealers';
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";
import React from 'react';



const Stack = createStackNavigator();

export default function InactiveDealers({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center'
            },
        }}>
            <Stack.Screen name="Dealers" component={RegisteredDealers} options={{
                title: 'Dealers',
                headerStyle: {
                    backgroundColor: 'black'
                },
                // headerTitle: () => (
                //     <View style={{ height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                //         <Entypo name="menu" size={24} color="white" onPress={() => navigation.openDrawer()} style={{ position: 'absolute', left: 3 }} />
                //         <View>
                //             <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Dealers</Text>
                //         </View>
                //     </View>
                // ),
            }} />


        </Stack.Navigator>
    )

}