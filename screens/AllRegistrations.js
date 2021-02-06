import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RegisteredCustomers from "../screens/RegisteredCustomers";
import RegisteredDealers from "../screens/RegisteredDealers";


export default function AllRegistrations() {

    const Tab = createMaterialTopTabNavigator();

    return (
        <Tab.Navigator
            lazy={true}
            tabBarOptions={{
                activeTintColor: 'white',
                labelStyle: { fontSize: 15 },
                style: { backgroundColor: 'black', elevation: 5 },
            }}
        >
            <Tab.Screen
                name="Customers"
                component={RegisteredCustomers}
                options={{ tabBarLabel: 'Customers' }}
            />
            <Tab.Screen
                name="Dealers"
                component={RegisteredDealers}
                options={{ tabBarLabel: 'Dealers' }}
            />
        </Tab.Navigator>
    );
}

