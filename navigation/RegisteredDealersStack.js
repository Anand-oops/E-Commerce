// import RegisteredDealers from '../screens/RegisteredDealers';
// import { createStackNavigator } from "@react-navigation/stack";
// import { View, Text } from "react-native";
// import React from 'react';



// const Stack = createStackNavigator();

// export default function RegisteredDealersStack({ navigation }) {
//     return (
//         <Stack.Navigator screenOptions={{
//             headerTintColor: 'white',
//             headerTitleStyle: {
//                 fontWeight: 'bold',
//                 alignSelf: 'center'
//             },
//         }}>
//             <Stack.Screen name="Dealers" component={RegisteredDealers} options={{
//                 title: 'Dealers',
//                 headerStyle: {
//                     backgroundColor: 'black'
//                 },
//                 headerTitle: () => (
//                     <View style={{ height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
//                         <Entypo name="menu" size={24} color="white" onPress={() => navigation.openDrawer()} style={{ position: 'absolute', left: 3 }} />
//                         <View>
//                             <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, color: 'white' }}>Dealers</Text>
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
import ActiveDealers from "../screens/ActiveDealers";
import InactiveDealers from "../screens/InactiveDealers";
const Tab = createBottomTabNavigator();

const RegisteredDealersStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Active" component={ActiveDealers}
      options={{
      tabBarLabel: 'Active',
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="home" color={color} size={size} />
      ),
    }}
       />


      <Tab.Screen name="Inactive" component={InactiveDealers}
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

export default RegisteredDealersStack;




