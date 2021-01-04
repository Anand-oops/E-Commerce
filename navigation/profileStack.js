// import { createStackNavigator } from "react-navigation-stack";
// import Demo from '../screens/demoScreen';

// const screens = {
//     Demo:{  screen:Demo, navigationOptions:{
//         title:'Demo Screen'
//     } }
// }

// const StackDemo = createStackNavigator(screens);

// export default StackDemo;

import {createStackNavigator} from "react-navigation-stack";
import Header from '../shared/header';
import React from 'react';
import Profile from '../screens/profileScreen';

const screens = {
    Profile:{  screen:Profile, navigationOptions: ({navigation})=>{
        return {
            
                headerTitle:()=><Header navigation={navigation} title='Profile'/>,
            
        }
    } }
}

const profileStack = createStackNavigator(screens,{
    defaultNavigationOptions:{
        headerTintColor:'white',
        headerStyle:{
            backgroundColor:'black',height:90
        }
    }
});

export default profileStack;