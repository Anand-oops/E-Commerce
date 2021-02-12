import { createStackNavigator } from "react-navigation-stack";
import Header from '../shared/Header';
import React from 'react';
import Profile from '../screens/ProfileScreen';
import ProfileDisplayScreen from '../screens/ProfileDisplayScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen'
import ChangeEmailScreen from "../screens/ChangeEmailScreen";

const screens = {
    ProfileDisplayScreen: {
        screen: ProfileDisplayScreen, navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Profile' />
            }
        }
    },
    'Edit Profile': {
        screen: Profile
    },
    'Change Password': {
        screen: ChangePasswordScreen
    },
    'Change Email': {
        screen: ChangeEmailScreen
    }
}

const profileStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'black', height: 70
        }
    }
});

export default profileStack;
