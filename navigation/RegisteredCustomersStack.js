import {createStackNavigator} from "react-navigation-stack";
import Header from '../shared/Header';
import React from 'react';
import RegisteredCustomers from '../screens/RegisteredCustomers'



const screens = {
    Users:{  screen:RegisteredCustomers, navigationOptions: ({navigation})=>{
        return {
            
                headerTitle:()=><Header navigation={navigation} title='Users'/>,
            
        }
    } }
}

const RegisteredCustomersStack = createStackNavigator(screens,{
  defaultNavigationOptions:{
      headerTintColor:'white',
      headerStyle:{
          backgroundColor:'black',height:70
      }
  }
});

export default RegisteredCustomersStack;

