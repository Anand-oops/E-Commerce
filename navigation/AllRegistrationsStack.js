import { createStackNavigator } from "react-navigation-stack";
import Header from '../shared/Header';
import React from 'react';
import AllRegistrations from '../screens/AllRegistrations'

const screens = {
    AllRegistration: {
        screen: AllRegistrations, navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Registrations' />,
            }
        }
    }
}

const AllRegistrationsStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'black', height: 70
        }
    }
});

export default AllRegistrationsStack;

