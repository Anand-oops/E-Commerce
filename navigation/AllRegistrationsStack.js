import { createStackNavigator } from "react-navigation-stack";
import Header from '../shared/Header';
import React from 'react';
import AllRegistrations from '../screens/AllRegistrations'

const screens = {
    AllCustomerOrder: {
        screen: AllRegistrations, navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Registrations' />,
            }
        }
    }
}

const CustomerOrdersStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'black', height: 70
        }
    }
});

export default CustomerOrdersStack;

