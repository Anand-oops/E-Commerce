import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DeliveredOrders from '../screens/DeliveredOrdersScreen'
import CancelledOrders from "../screens/CancelledOrdersScreen";
import PendingOrders from "../screens/PendingOrders";


export default function AllCustomerOrders() {

	const Tab = createMaterialTopTabNavigator();

	return (

		<View style={styles.main}>
			<Tab.Navigator
				tabBarOptions={{
					activeTintColor: 'white',
					labelStyle: { fontSize: 10 },
					style: { backgroundColor: 'black', elevation: 5 },
				}}
			>
				<Tab.Screen
					name="Delivered Orders"
					component={DeliveredOrders}
					options={{ tabBarLabel: 'Delivered Orders' }}
				/>
				<Tab.Screen
					name="Pending Orders"
					component={PendingOrders}
					options={{ tabBarLabel: 'Pending Orders' }}
				/>
				<Tab.Screen
					name="Cancelled Orders"
					component={CancelledOrders}
					options={{ tabBarLabel: 'Cancelled Orders' }}
				/>
			</Tab.Navigator>
		</View>
	);
}

const styles = StyleSheet.create({
	main: {
		height: '100%',
		width: '100%'
	},
	container: {
		flex: 1,
		alignItems: "center",
		paddingTop: '50%'
	},
});