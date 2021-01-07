import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { useContext } from 'react'
import { createAppContainer } from "react-navigation";
import AppStack from "./AppStack";
import profileStack from "./ProfileStack";
import pendingListStack from "./PendingListStack";
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from '../navigation/AuthProvider';
import Firebase from '../firebaseConfig';
import DrawerItemsStack from '../navigation/DrawerItemsStack';
import React from "react";
import { View, SafeAreaView, StyleSheet, Text, ScrollView, Dimensions, TouchableOpacity, Alert } from "react-native";


const customComponent = (props) => {

    
    const { user, logout } = useContext(AuthContext);
    var name;
    const ref = Firebase.database().ref(`Admin/${user.uid}`);
    // ref.once('value').then(function(snapshot){
    //      var data=snapshot.val();
    //     console.log(data.firstName);

    //     name=data.firstName;

    // })
    ref.on('value', function (snapshot) {
        var data = snapshot.val();
        //console.log(data.firstName);

        name = data.firstName;

    })
    return(
    <SafeAreaView style={{ flex: 1, }}>

        <View style={{ flexDirection:'row',height: 100, backgroundColor: 'white', alignItems: 'center',  marginTop: 10,paddingTop:15,paddingLeft:15 }}>
            <AntDesign name="user" size={40} color="black"  />
            <Text style={{ marginTop: 10,fontSize:20 }}> Hey, User !!</Text>
        </View>

        <ScrollView>
            <DrawerItems  {...props} />
        </ScrollView>
        <TouchableOpacity >
            <Text
                style={{ width:'100%',backgroundColor:'#eee',color: 'black', fontSize: 20, fontWeight: 'bold',height:50,textAlign:'center',paddingTop:10 }}
                onPress={() => {
                    Alert.alert("Logout", "You will be logged out...",
                    [
                        {text:"Cancel" },
                        {text:"Proceed", onPress: () => logout()}
                    ],{cancelable: false}
                    );
                } }>
                SIGN OUT</Text>
        </TouchableOpacity>
    </SafeAreaView>
)}


const screens = {

    Home: { screen: AppStack },
    PendingList: { screen: pendingListStack },
    DrawerItemsList:{screen:DrawerItemsStack},
    Profile: { screen: profileStack },
}

const RootNavigationDrawer = createDrawerNavigator(screens, { contentComponent: customComponent });

export default createAppContainer(RootNavigationDrawer);