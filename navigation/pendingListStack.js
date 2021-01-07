import {createStackNavigator} from "react-navigation-stack";
import Header from '../shared/Header';
import React from 'react';
import PendingListScreen from '../screens/PendingListScreen';

const screens = {
    PendingList:{  screen:PendingListScreen, navigationOptions: ({navigation})=>{
        return {
            
                headerTitle:()=><Header navigation={navigation} title='Pending list'/>,
            
        }
    } }
}

const pendingListStack = createStackNavigator(screens,{
    defaultNavigationOptions:{
        headerTintColor:'white',
        headerStyle:{
            backgroundColor:'black',height:90
        }
    }
});

export default pendingListStack;