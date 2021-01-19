import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PendingListScreen from  '../screens/PendingListScreen';
import AllOrders from "../screens/AllOrders";
import ApprovedOrders from "../screens/ApprovedOrders";
import PendingOrders from "../screens/PendingOrders";
import Profile from "../screens/ProfileScreen";
export default function AllCustomerOrders() {


    const Tab = createMaterialTopTabNavigator();

    return (

        <View style={styles.main}>
        <Tab.Navigator
        initialRouteName="Feed"
        tabBarOptions={{
          activeTintColor: 'white',
          labelStyle: { fontSize: 10 },
          style: { backgroundColor: 'gray',elevation:5},
        }}
      >
          <Tab.Screen
          name="All Orders"
          component={AllOrders}
          options={{ tabBarLabel: 'All orders' }}
        />
        <Tab.Screen
          name="Pending Orders"
          component={PendingOrders}
          options={{ tabBarLabel: 'Pending Orders' }}
        />
        <Tab.Screen
          name="Approved Orders"
          component={ApprovedOrders}
          options={{ tabBarLabel: 'Approved Orders' }}
        />
      </Tab.Navigator>
      </View>
    );
}

const styles = StyleSheet.create({
    main: {
        height:'100%',
        width:'100%'
    },
    container: {
        flex: 1,
        alignItems: "center",
        // justifyContent: "center",
        paddingTop:'50%'
    },
});