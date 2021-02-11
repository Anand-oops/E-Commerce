import { createStackNavigator } from "react-navigation-stack";
import Header from '../shared/Header';
import React from 'react';
import RegisteredCustomers from '../screens/RegisteredCustomers';

const screens = {
    RegisteredCustomers: {
        screen: RegisteredCustomers, navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Registered Customers' />,
            }
        }
    }
}

const Stack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'black', height: 70
        }
    }
});

export default Stack;
