import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { useContext } from 'react'
import { createAppContainer } from "react-navigation";
import AppStack from './AppStack';
import profileStack from './ProfileStack';
import pendingListStack from './PendingListStack';
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from './AuthProvider';
import Firebase from '../firebaseConfig';
import DrawerItemsStack from './DrawerItemsStack';
import CustomerOrdersStack from './CustomerOrdersStack'
import RegisteredCustomersStack from "./RegisteredCustomersStack";
import RegisteredDealersStack from "./RegisteredDealersStack";
import React from "react";
import { SafeAreaView, Text, ScrollView, TouchableOpacity, Alert } from "react-native";

const customComponent = (props) => {

    const { user, logout } = useContext(AuthContext);
    var name = "Admin"
    const ref = Firebase.database().ref(`Admin/${user.uid}`);
    ref.on('value', function (snapshot) {
        var data = snapshot.val();
        name = data.firstName;

    })

    return (
        <SafeAreaView style={{ flex: 1, }}>

            <TouchableOpacity onPress={() => console.log("Props")}
            style={{ flexDirection: 'row', height: 100, backgroundColor: 'white', alignItems: 'center', marginTop: 10, paddingTop: 15, paddingLeft: 15 }}>
                <AntDesign name="user" size={40} color="black" />
                <Text style={{ marginTop: 10, fontSize: 20 }}> {"Hey " + name + "!!"}</Text>
            </TouchableOpacity>

            <ScrollView>
                <DrawerItems  {...props} />
            </ScrollView>
            <TouchableOpacity >
                <Text
                    style={{ width: '100%', backgroundColor: '#778899', color: 'black', fontSize: 20, fontWeight: 'bold', height: 50, textAlign: 'center', paddingTop: 10 }}
                    onPress={() => {
                        Alert.alert("Logout", "You will be logged out...",
                            [
                                { text: "Cancel" },
                                { text: "Proceed", onPress: () => logout() }
                            ], { cancelable: false }
                        );
                    }}>
                    SIGN OUT</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}




const screens = {

    Home: { screen: AppStack },
    'Pending List': { screen: pendingListStack },
    'Drawer Items': { screen: DrawerItemsStack },
    Profile : { screen: profileStack },
    'Customer Orders': { screen: CustomerOrdersStack },
    'Registered Customers': { screen: RegisteredCustomersStack },
    'Registered Dealers': { screen: RegisteredDealersStack }
}

const RootNavigationDrawer = createDrawerNavigator(screens, { contentComponent: customComponent });

export default createAppContainer(RootNavigationDrawer);
