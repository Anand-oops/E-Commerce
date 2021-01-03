import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import AppStack from "./AppStack";
import profileStack from "./profileStack";
import pendingListStack from "./pendingListStack";
import { AntDesign } from '@expo/vector-icons';

import React from "react";

import { View, SafeAreaView, StyleSheet, Text, ScrollView, Dimensions, TouchableOpacity } from "react-native";

const customComponent = (props) => (
    <SafeAreaView style={{ flex: 1, }}>

        <View style={{ flexDirection:'row',height: 100, backgroundColor: 'white', alignItems: 'center',  marginTop: 10,paddingTop:15,paddingLeft:15 }}>
            <AntDesign name="user" size={40} color="black"  />
            <Text style={{ marginTop: 10,fontSize:20 }}> Hey, USER!!</Text>
        </View>

        <ScrollView>
            <DrawerItems  {...props} />
        </ScrollView>
        <TouchableOpacity >
            <Text
                style={{ width:'100%',backgroundColor:'#eee',color: 'black', fontSize: 20, fontWeight: 'bold',height:50,textAlign:'center',paddingTop:10 }}>
                SIGN OUT</Text>
        </TouchableOpacity>
    </SafeAreaView>
)

const screens = {

    Home: { screen: AppStack },
    Profile: { screen: profileStack },
    PendingList:{screen: pendingListStack}
}

const RootNavigationDrawer = createDrawerNavigator(screens, { contentComponent: customComponent });

export default createAppContainer(RootNavigationDrawer);