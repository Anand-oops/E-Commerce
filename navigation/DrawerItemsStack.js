import {createStackNavigator} from "react-navigation-stack";
import Header from '../shared/header';
import React from 'react';
import DrawerItemsList from '../screens/DrawerItemsList';

const screens = {
    PendingList:{  screen:DrawerItemsList, navigationOptions: ({navigation})=>{
        return {
            
                headerTitle:()=><Header navigation={navigation} title='Drawer List'/>,
            
        }
    } }
}

const drawerStack = createStackNavigator(screens,{
    defaultNavigationOptions:{
        headerTintColor:'white',
        headerStyle:{
            backgroundColor:'black',height:90
        }
    }
});

export default drawerStack;