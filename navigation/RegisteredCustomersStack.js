// import { createStackNavigator } from "@react-navigation/stack";
// import { View, Text } from "react-native";
// import React from 'react';
// import RegisteredCustomers from '../screens/RegisteredCustomers';


// const Stack = createStackNavigator();

// export default function RegisteredCustomersStack({ navigation }) {
//     return (
//         <Stack.Navigator screenOptions={{
//             headerTintColor: 'white',
//             headerTitleStyle: {
//                 fontWeight: 'bold',
//                 alignSelf: 'center'
//             },
//         }}>
//             <Stack.Screen name="Customers" component={RegisteredCustomers} options={{
//                 title: 'Customers',
//                 headerStyle: {
//                     backgroundColor: 'black'
//                 },
//                 headerTitle: () => (
//                     <View style={{ height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
//                         <Entypo name="menu" size={24} color="white" onPress={() => navigation.openDrawer()} style={{ position: 'absolute', left: 3 }} />
//                         <View>
//                             <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Customers</Text>
//                         </View>
//                     </View>
//                 ),
//             }} />


//         </Stack.Navigator>
//     )

// }
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActiveCustomers from "../screens/ActiveCustomers";
import InactiveCustomers from "../screens/InactiveCustomers";
const Tab = createBottomTabNavigator();

const RegisteredCustomersStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Active" component={ActiveCustomers}
      options={{
      tabBarLabel: 'Active',
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="home" color={color} size={size} />
      ),
    }}
       />


      <Tab.Screen name="Inactive" component={InactiveCustomers}
      options={{
                tabBarLabel: 'Inactive',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
              }}
       />
    </Tab.Navigator>
  );
};

export default RegisteredCustomersStack;


