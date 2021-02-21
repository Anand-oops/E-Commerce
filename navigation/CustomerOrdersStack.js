import { createStackNavigator } from "@react-navigation/stack";
import { View,Text } from "react-native";
import React from 'react';
import AllCustomerOrders from '../screens/AllCustomerOrders';
import { Entypo } from '@expo/vector-icons';


const Stack = createStackNavigator();

export default function CustomerOrdersStack({navigation}){
return(
    <Stack.Navigator screenOptions={{
		headerTintColor: 'white',
		headerTitleStyle: {
			fontWeight: 'bold',
			alignSelf: 'center'
		},
	}}>
		<Stack.Screen name="All Customer Orders" component={AllCustomerOrders} options={{
			title: 'All Customer Orders',
			headerStyle: {
				backgroundColor: '#223240'
			},
			headerTitle: () => (
				<View style={{ height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
					<Entypo name="menu" size={24} color="white" onPress={() => navigation.openDrawer()} style={{ position: 'absolute', left: 3 }} />
					<View>
						<Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>All Customer Orders</Text>
					</View>
				</View>
			),
		}} />


	</Stack.Navigator>
)

}


