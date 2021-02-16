import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DeliveredOrders from '../screens/DeliveredOrdersScreen';
import CancelledOrders from "../screens/CancelledOrdersScreen";
import PendingOrders from "../screens/PendingOrdersScreen";
import ReturnedOrders from '../screens/ReturnedOrdersScreen';


export default function AllCustomerOrders({ navigation }) {

	console.log('nv of all cus order', navigation);
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

			<Tab.Screen
				name="Returned Orders"
				component={ReturnedOrders}
				options={{ tabBarLabel: 'Returned Orders' }}
			/>
		</Tab.Navigator>
	);
}

