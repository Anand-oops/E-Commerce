import { createStackNavigator } from "@react-navigation/stack";
import { View,Text } from "react-native";
import React from 'react';
import AllUsersTabStack from "./AllUsersTabStack";
import { Entypo } from '@expo/vector-icons';


const Stack = createStackNavigator();

export default function AllUsersStack({navigation}){
return(
    <Stack.Navigator screenOptions={{
		headerTintColor: 'white',
		headerTitleStyle: {
			fontWeight: 'bold',
			alignSelf: 'center'
		},
	}}>
		<Stack.Screen name="All Users" component={AllUsersTabStack} options={{
			title: 'All Users',
			headerStyle: {
				backgroundColor: 'black'
			},
			headerTitle: () => (
				<View style={{ height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
					<Entypo name="menu" size={24} color="white" onPress={() => navigation.openDrawer()} style={{ position: 'absolute', left: 3 }} />
					<View>
						<Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>All Users</Text>
					</View>
				</View>
			),
		}} />


	</Stack.Navigator>
)

}


