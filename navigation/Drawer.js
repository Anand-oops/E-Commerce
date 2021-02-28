import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { useContext } from 'react'
import AppStack from './AppStack';
import profileStack from './ProfileStack';
import pendingListStack from './PendingListStack';
import { AuthContext } from './AuthProvider';
import Firebase from '../firebaseConfig';
import DrawerItemsStack from './DrawerItemsStack';
import CustomerOrdersStack from './CustomerOrdersStack';
import AllUsersStack from "./AllUsersStack";
import React from "react";
import { SafeAreaView, Text, ScrollView, TouchableOpacity, Alert, Image } from "react-native";
import dummyImage from "../assets/avatar.png";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Notifications from '../screens/Notifications';
import AddProductStack from './AddProductStack'

const DrawerNav = createDrawerNavigator();

function DrawerContent(props) {
    const { user, logout } = useContext(AuthContext);
    var name = "Admin";
    var profileImage = Image.resolveAssetSource(dummyImage).uri;
    const ref = Firebase.database().ref(`Admin/${user.uid}`);
    ref.on('value', function (snapshot) {

        var data = snapshot.val();
        if (data.firstName) {
            name = data.firstName;
        }
        if (data.profileImage) {
            profileImage = data.profileImage;
        }

    })
    return (
        <SafeAreaView style={{ flex: 1, }}>

            <TouchableOpacity onPress={() => { props.navigation.navigate('Profile') }}
                style={{ flexDirection: 'row', height: 100, backgroundColor: '#778899', alignItems: 'center', padding: 15, paddingTop: 20 }}>
                <Image style={{
                    width: 60,
                    height: 60,
                    borderRadius: 63,
                    borderWidth: 4,
                    borderColor: "white",
                    marginTop: 10,
                }}
                    source={{ uri: profileImage }} />
                <Text style={{ marginTop: 10, fontSize: 20 }}> {"Hey " + name + "!!"}</Text>
            </TouchableOpacity>

            <ScrollView>
                <DrawerItemList  {...props} />
            </ScrollView>
            <TouchableOpacity
                style={{ flexDirection: 'row', width: '100%', backgroundColor: '#778899', height: 50, paddingTop: 10 }}
                onPress={() => {
                    Alert.alert("Logout", "You will be logged out...",
                        [
                            { text: "Cancel" },
                            { text: "Proceed", onPress: () => logout() }
                        ], { cancelable: false }
                    );
                }} >
                <MaterialCommunityIcons name='logout' size={25} style={{ paddingLeft: 10 }} />
                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', textAlign: 'center', flex: 1 }}>SIGN OUT</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default function Drawer() {


    return (
        <DrawerNav.Navigator initialRouteName="HomeScreen" drawerContentOptions={{ activeBackgroundColor: '#a6b8ca', activeTintColor: '#0001a1' }}
            drawerContent={props => <DrawerContent {...props} />} >
            <DrawerNav.Screen name="Home" component={AppStack}
                options={{
                    title: 'Home',
                }}
            />

            <DrawerNav.Screen name="Profile" component={profileStack}

                options={{
                    title: 'Profile',
                }}
            />
            <DrawerNav.Screen name="Pending List" component={pendingListStack}

                options={{
                    title: 'Pending List',
                }}
            />
            <DrawerNav.Screen name="Drawer Items" component={DrawerItemsStack}

                options={{
                    title: 'Drawer Items',
                }}
            />
            <DrawerNav.Screen name="Customer Orders" component={CustomerOrdersStack}

                options={{
                    title: 'Customer Orders',
                }}
            />
            <DrawerNav.Screen name="All users" component={AllUsersStack}

                options={{
                    title: 'All Users',
                }}
            />
            <DrawerNav.Screen name="Add Product" component={AddProductStack}

                options={{
                    title: 'Add Product',
                }}
            />
            <DrawerNav.Screen name="Notifications" component={Notifications}

                options={{
                    title: 'Notifications',
                }}
            />

        </DrawerNav.Navigator>
    )

}