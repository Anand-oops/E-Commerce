// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import RegisteredCustomers from '../screens/RegisteredCustomers';
// import RegisteredDealers from '../screens/RegisteredDealers';
// const Tab = createBottomTabNavigator();

// const AllUsersStack = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Customers" component={RegisteredCustomers}
//       options={{
//       tabBarLabel: 'Customers',
//       tabBarIcon: ({ color, size }) => (
//         <MaterialCommunityIcons name="home" color={color} size={size} />
//       ),
//     }}
//        />


//       <Tab.Screen name="Dealers" component={RegisteredDealers}
//       options={{
//                 tabBarLabel: 'Dealers',
//                 tabBarIcon: ({ color, size }) => (
//                   <MaterialCommunityIcons name="account" color={color} size={size} />
//                 ),
//               }}
//        />
//     </Tab.Navigator>
//   );
// };

// export default AllUsersStack;

import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RegisteredCustomers from '../screens/RegisteredCustomers';
import RegisteredDealers from '../screens/RegisteredDealers';
import RegisteredCustomersStack  from "./RegisteredCustomersStack";
import RegisteredDealersStack  from "./RegisteredDealersStack";


export default function AllUsersTabStack({navigation}) {

	console.log('nv of all cus order',navigation);
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

