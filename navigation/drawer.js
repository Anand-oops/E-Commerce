import {createDrawerNavigator} from "react-navigation-drawer";
import {createAppContainer} from "react-navigation";
import AppStack from "./AppStack";
import StackDemo from "./demoStack";
const screens={

    Home:{ screen: AppStack},
    Demo:{ screen: StackDemo}
}

const RootNavigationDrawer = createDrawerNavigator(screens);

export default createAppContainer(RootNavigationDrawer);