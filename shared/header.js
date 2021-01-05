import React from 'react';
import {StyleSheet,Text,View  } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';


export default function header({navigation, title}){

    const openDrawer=()=>{
             navigation.openDrawer();
    }

    return(
        <View style={styles.header}>
            <Entypo name="menu" size={24} color="white" onPress={openDrawer} style={styles.icon}/>
            <View>
            
                <Text style={styles.headertext}>{title}</Text>
            </View>
            {/* <AntDesign name="hearto" size={22} color="white" style={{position:'absolute',right:40}} />
            <AntDesign name="shoppingcart" size={24} color="white" style={{position:'absolute',right:3}}/> */}
        </View>
    )
}

const styles=StyleSheet.create({
   header:{
       height:'100%',
       width:'100%',
       flexDirection:'row',
       alignItems:'center',
       justifyContent:'center',
   },
   headertext:{
       fontWeight:'bold',
       fontSize:20,
       letterSpacing:1,
       color:'white'
   },
   icon:{
       position:'absolute',
       left:3
   }
});