import {createStackNavigator} from "react-navigation-stack";
import Header from '../shared/Header';
import React from 'react';
import PendingListScreen from '../screens/PendingListScreen';
import ProfileScreen from '../screens/ProfileScreen'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllOrders from '../screens/AllCustomerOrders'

const Tab = createMaterialTopTabNavigator();

const screens = {
    PendingList:{  screen:DrawerItemsList, navigationOptions: ({navigation})=>{
        return {
            
                headerTitle:()=><Header navigation={navigation} title='Drawer List'/>,
            
        }
    } }
}

export default function CustomerOrder() {
    return (
      <Tab.Navigator
        initialRouteName="Feed"
        tabBarOptions={{
          activeTintColor: '#e91e63',
          labelStyle: { fontSize: 12 },
          style: { backgroundColor: 'powderblue' },
        }}
      >
        <Tab.Screen
          name="All Orders"
          component={AllOrders}
          options={{ tabBarLabel: 'Home' }}
        />
        <Tab.Screen
          name="Pending Orders"
          component={PendingListScreen}
          options={{ tabBarLabel: 'Updates' }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{ tabBarLabel: 'Profile' }}
        />
      </Tab.Navigator>
    );
  }