// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from '../screens/HomeScreen';

// const Stack = createStackNavigator();

// const AppStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name='Home' component={HomeScreen} />
//     </Stack.Navigator>
//   );
// }

// export default AppStack;
import {createStackNavigator} from "react-navigation-stack";
import Home from '../screens/HomeScreen';
import Header from '../shared/header';
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