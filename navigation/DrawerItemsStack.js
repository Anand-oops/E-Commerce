import { createStackNavigator } from "@react-navigation/stack";
import { View,Text } from "react-native";
import { Entypo } from '@expo/vector-icons';
import React from 'react';
import DrawerItemsList from '../screens/DrawerItemsList';
import SubCategory from "../screens/SubCategory";

const Stack = createStackNavigator();

export default function DrawerItemsStack({navigation}){
return(
    <Stack.Navigator screenOptions={{
		headerTintColor: 'white',
		headerTitleStyle: {
			fontWeight: 'bold',
			alignSelf: 'center'
		},
	}}>
		<Stack.Screen name="Drawer List" component={DrawerItemsList} options={{
			title: 'Drawer List',
			headerStyle: {
				backgroundColor: '#223240'
			},
			headerTitle: () => (
				<View style={{ height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
					<Entypo name="menu" size={24} color="white" onPress={() => navigation.openDrawer()} style={{ position: 'absolute', left: 3 }} />
					<View>
						<Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Drawer List</Text>
					</View>
				</View>
			),
		}} />

		<Stack.Screen name="SubCategory" component={SubCategory} options={{
			title: 'Sub Category',
			headerStyle: {
				backgroundColor: '#223240'
			},
			headerTitle: () => (
				<View style={{ height: '100%', width: '100%', flexDirection: 'row'}}>

					<View>
						<Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Sub Category</Text>
					</View>

				</View>
			),
		}} />

	</Stack.Navigator>
)

}
