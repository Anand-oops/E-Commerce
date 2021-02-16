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
import { SafeAreaView, Text, ScrollView, TouchableOpacity, Alert,Image } from "react-native";
import dummyImage from "../assets/avatar.png";

const customComponent = (props) => {

    const { user, logout } = useContext(AuthContext);
    var name = "Admin";
    var profileImage=Image.resolveAssetSource(dummyImage).uri;
    const ref = Firebase.database().ref(`Admin/${user.uid}`);
    ref.on('value', function (snapshot) {
        var data = snapshot.val();
        if(data.firstName){
            name = data.firstName;
        }
        
        if (data.profileImage) {
            profileImage=data.profileImage;
        }

    })

    return (
        <SafeAreaView style={{ flex: 1, }}>

            <TouchableOpacity onPress={() => {props.navigation.navigate('Profile')}}
            style={{ flexDirection: 'row', height: 100, backgroundColor: 'white', alignItems: 'center', marginTop: 10, paddingTop: 15, paddingLeft: 15 }}>
                <Image style={{
                        width: 34,
                        height: 34,
                        borderRadius: 63,
                        borderWidth: 4,
                        borderColor: "white",
                        marginTop: 10,
                    }}
                        source={{ uri: profileImage }} />
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
