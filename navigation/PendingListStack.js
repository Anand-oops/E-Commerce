import { createStackNavigator } from "@react-navigation/stack";
import { View,Text } from "react-native";
import { Entypo } from '@expo/vector-icons';
import React from 'react';
import PendingListScreen from '../screens/PendingListScreen';
import DealerItems from "../screens/DealerItems";


const Stack = createStackNavigator();

export default function PendingListStack({navigation}){
return(
    <Stack.Navigator screenOptions={{
		headerTintColor: 'white',
		headerTitleStyle: {
			fontWeight: 'bold',
			alignSelf: 'center'
		},
	}}>
		<Stack.Screen name="Pending List" component={PendingListScreen} options={{
			title: 'Pending List',
			headerStyle: {
				backgroundColor: '#223240'
			},
			headerTitle: () => (
				<View style={{ height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
					<Entypo name="menu" size={24} color="white" onPress={() => navigation.openDrawer()} style={{ position: 'absolute', left: 3 }} />
					<View>
						<Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Pending List</Text>
					</View>
				</View>
			),
		}} />

		<Stack.Screen name="DealerItems" component={DealerItems} options={{
			title: 'Dealer Items',
			headerStyle: {
				backgroundColor: '#223240'
			},
			headerTitle: () => (
				<View style={{ height: '100%', width: '100%', flexDirection: 'row'}}>

					<View>
						<Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Dealer Items</Text>
					</View>

				</View>
			),
		}} />

	</Stack.Navigator>
)

}

