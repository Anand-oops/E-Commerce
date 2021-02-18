// import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createDrawerNavigator,DrawerItemList } from '@react-navigation/drawer';
import { useContext } from 'react'
import { createAppContainer } from "react-navigation";
import AppStack from './AppStack';
import profileStack from './ProfileStack';
import pendingListStack from './PendingListStack';
import { AuthContext } from './AuthProvider';
import Firebase from '../firebaseConfig';
import DrawerItemsStack from './DrawerItemsStack';
import CustomerOrdersStack from './CustomerOrdersStack';
import AllUsersStack from "./AllUsersStack";
import RegisteredCustomersStack from "./RegisteredCustomersStack";
import RegisteredDealersStack from "./RegisteredDealersStack";
import React from "react";
import { SafeAreaView, Text, ScrollView, TouchableOpacity, Alert, Image,View } from "react-native";
import dummyImage from "../assets/avatar.png";

// const customComponent = (props) => {

//     const { user, logout } = useContext(AuthContext);
//     var name = "Admin";
//     var profileImage=Image.resolveAssetSource(dummyImage).uri;
//     const ref = Firebase.database().ref(`Admin/${user.uid}`);
//     ref.on('value', function (snapshot) {
//         var data = snapshot.val();
//         if(data.firstName){
//             name = data.firstName;
//         }

//         if (data.profileImage) {
//             profileImage=data.profileImage;
//         }

//     })

//     return (
//         <SafeAreaView style={{ flex: 1, }}>

//             <TouchableOpacity onPress={() => {props.navigation.navigate('Profile')}}
//             style={{ flexDirection: 'row', height: 100, backgroundColor: 'white', alignItems: 'center', marginTop: 10, paddingTop: 15, paddingLeft: 15 }}>
//                 <Image style={{
//                         width: 34,
//                         height: 34,
//                         borderRadius: 63,
//                         borderWidth: 4,
//                         borderColor: "white",
//                         marginTop: 10,
//                     }}
//                         source={{ uri: profileImage }} />
//                 <Text style={{ marginTop: 10, fontSize: 20 }}> {"Hey " + name + "!!"}</Text>
//             </TouchableOpacity>

//             <ScrollView>
//                 <DrawerItems  {...props} />
//             </ScrollView>
//             <TouchableOpacity >
//                 <Text
//                     style={{ width: '100%', backgroundColor: '#778899', color: 'black', fontSize: 20, fontWeight: 'bold', height: 50, textAlign: 'center', paddingTop: 10 }}
//                     onPress={() => {
//                         Alert.alert("Logout", "You will be logged out...",
//                             [
//                                 { text: "Cancel" },
//                                 { text: "Proceed", onPress: () => logout() }
//                             ], { cancelable: false }
//                         );
//                     }}>
//                     SIGN OUT</Text>
//             </TouchableOpacity>
//         </SafeAreaView>
//     )
// }




// const screens = {

//     Home: { screen: AppStack },
//     'Pending List': { screen: pendingListStack },
//     'Drawer Items': { screen: DrawerItemsStack },
//     Profile : { screen: profileStack },
//     'Customer Orders': { screen: CustomerOrdersStack },
//     'Registered Customers': { screen: RegisteredCustomersStack },
//     'Registered Dealers': { screen: RegisteredDealersStack }
// }

// const RootNavigationDrawer = createDrawerNavigator(screens, { contentComponent: customComponent });

// export default createAppContainer(RootNavigationDrawer);

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
                style={{ flexDirection: 'row', height: 100, backgroundColor: '#778899', alignItems: 'center', padding: 15, paddingTop:20 }}>
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
                {/* <DrawerItem
                label='Proffile'
                onPress={()=>{navigation.navigate('Profile')}}
                /> */}
                <DrawerItemList  {...props} />
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

export default function Drawer() {


    return (
        <DrawerNav.Navigator initialRouteName="HomeScreen" drawerContentOptions={{ activeBackgroundColor: '#fff', activeTintColor: '#ff788f' }}
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

        </DrawerNav.Navigator>
    )

}