import {createStackNavigator} from "react-navigation-stack";
import Header from '../shared/header';
import React from 'react';
import PendingListScreen from '../screens/pendingListScreen';

const screens = {
    PendingList:{  screen:PendingListScreen, navigationOptions: ({navigation})=>{
        return {
            
                headerTitle:()=><Header navigation={navigation} title='Pending list'/>,
            
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