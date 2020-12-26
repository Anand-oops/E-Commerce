import { createStackNavigator } from "react-navigation-stack";
import Demo from '../screens/demoScreen';

const screens = {
    Demo:{  screen:Demo, navigationOptions:{
        title:'Demo Screen'
    } }
}

const StackDemo = createStackNavigator(screens);

export default StackDemo;