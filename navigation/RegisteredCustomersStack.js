import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from '@expo/vector-icons';
import ActiveCustomers from "../screens/ActiveCustomers";
import InactiveCustomers from "../screens/InactiveCustomers";


const Tab = createBottomTabNavigator();

const RegisteredCustomersStack = () => {
	return (
		<Tab.Navigator
			tabBarOptions={{
				activeTintColor: 'white',
				activeBackgroundColor: '#223240',
				inactiveBackgroundColor:'#223240'
			}}>
			<Tab.Screen name="Active" component={ActiveCustomers}
				options={{
					tabBarLabel: 'Active',
					tabBarIcon: ({ color }) => (
						<FontAwesome5 name="user-alt" size={20} color={color} />
					),
				}}
			/>


			<Tab.Screen name="Inactive" component={InactiveCustomers}
				options={{
					tabBarLabel: 'Inactive',
					tabBarIcon: ({ color }) => (
						<FontAwesome5 name="user-alt-slash" size={20} color={color} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default RegisteredCustomersStack;


