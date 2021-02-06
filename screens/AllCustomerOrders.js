import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DeliveredOrders from '../screens/DeliveredOrdersScreen'
import CancelledOrders from "../screens/CancelledOrdersScreen";
import PendingOrders from "../screens/PendingOrdersScreen";


export default function AllCustomerOrders() {

	const Tab = createMaterialTopTabNavigator();

	return (
		<Tab.Navigator
			lazy={true}
			tabBarOptions={{
				activeTintColor: 'white',
				labelStyle: { fontSize: 10 },
				style: { backgroundColor: 'black', elevation: 5 },
			}}
		>
			<Tab.Screen
				name="Pending Orders"
				component={PendingOrders}
				options={{ tabBarLabel: 'Pending Orders' }}
			/>

			<Tab.Screen
				name="Delivered Orders"
				component={DeliveredOrders}
				options={{ tabBarLabel: 'Delivered Orders' }}
			/>

			<Tab.Screen
				name="Cancelled Orders"
				component={CancelledOrders}
				options={{ tabBarLabel: 'Cancelled Orders' }}
			/>
		</Tab.Navigator>
	);
}

