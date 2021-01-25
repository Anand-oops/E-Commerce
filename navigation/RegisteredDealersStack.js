import {createStackNavigator} from "react-navigation-stack";
import Header from '../shared/Header';
import React from 'react';
import RegisteredDealers from '../screens/RegisteredDealers'



const screens = {
    Users:{  screen:RegisteredDealers, navigationOptions: ({navigation})=>{
        return {
            
                headerTitle:()=><Header navigation={navigation} title='Dealers'/>,
            
        }
    } }
}

const RegisteredDealersStack = createStackNavigator(screens,{
  defaultNavigationOptions:{
      headerTintColor:'white',
      headerStyle:{
          backgroundColor:'black',height:70
      }
  }
});

export default RegisteredDealersStack;

