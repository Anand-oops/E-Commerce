import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ActiveDealers from "../screens/ActiveDealers";
import InactiveDealers from "../screens/InactiveDealers";
import { FontAwesome5 } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

const RegisteredDealersStack = () => {
	return (
		<Tab.Navigator tabBarOptions={{
			activeTintColor: 'white',
			activeBackgroundColor: '#223240',
			inactiveBackgroundColor:'#223240'
		}}>
			<Tab.Screen name="Active" component={ActiveDealers}
				options={{
					tabBarLabel: 'Active',
					tabBarIcon: ({color }) => (
						<FontAwesome5 name="user-alt" size={20} color={color} />
					),
				}}
			/>


			<Tab.Screen name="Inactive" component={InactiveDealers}
				options={{
					tabBarLabel: 'Inactive',
					tabBarIcon: ({color }) => (
						<FontAwesome5 name="user-alt-slash" size={20} color={color} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default RegisteredDealersStack;




