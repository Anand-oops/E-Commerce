import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RegisteredCustomersStack  from "./RegisteredCustomersStack";
import RegisteredDealersStack  from "./RegisteredDealersStack";


export default function AllUsersTabStack({}) {

	const Tab = createMaterialTopTabNavigator();
	

	return (
		<Tab.Navigator
			lazy={true}
			tabBarOptions={{
				activeTintColor: 'white',
				labelStyle: { fontSize: 10 },
				style: { backgroundColor: '#223240', elevation: 5 },
			}}
		>
			<Tab.Screen
				name="Customers"
				component={RegisteredCustomersStack}
				options={{ tabBarLabel: 'Customers' }}
			/>

			<Tab.Screen
				name="Dealers"
				component={RegisteredDealersStack}
				options={{ tabBarLabel: 'Dealers' }}
			/>

		</Tab.Navigator>
	);
}

