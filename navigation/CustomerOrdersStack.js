import {createStackNavigator} from "react-navigation-stack";
import Header from '../shared/Header';
import React from 'react';
import AllCustomerOrders from '../screens/AllCustomerOrders'



const screens = {
    AllCustomerOrder:{  screen:AllCustomerOrders, navigationOptions: ({navigation})=>{
        return {
            
                headerTitle:()=><Header navigation={navigation} title='Orders'/>,
            
        }
    } }
}

const CustomerOrdersStack = createStackNavigator(screens,{
  defaultNavigationOptions:{
      headerTintColor:'white',
      headerStyle:{
          backgroundColor:'black',height:70
      }
  }
});

export default CustomerOrdersStack;

