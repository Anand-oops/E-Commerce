import {createStackNavigator} from "react-navigation-stack";
import Home from '../screens/HomeScreen';
import Header from '../shared/Header';
import React from 'react';

const screens = {
    Home:{  screen : Home,
            navigationOptions: ({navigation})=>{
                return {
                    
                        headerTitle:()=><Header navigation={navigation} title="Home"/>,
                    
                }
            }}
}

const AppStack = createStackNavigator(screens,{
    defaultNavigationOptions:{
        headerTintColor:'white',
        headerStyle:{
            backgroundColor:'black',height:70
        }
    }
});

export default AppStack;