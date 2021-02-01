import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RegisteredCustomers from "../screens/RegisteredCustomers";
import RegisteredDealers from "../screens/RegisteredDealers";


export default function AllRegistrations() {

    const Tab = createMaterialTopTabNavigator();

    return (

        <View style={styles.main}>
            <Tab.Navigator
                //initialRouteName="Feed"
                tabBarOptions={{
                    activeTintColor: 'white',
                    labelStyle: { fontSize: 15 },
                    style: { backgroundColor: 'gray', elevation: 5 },
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
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        height: '100%',
        width: '100%'
    },
});