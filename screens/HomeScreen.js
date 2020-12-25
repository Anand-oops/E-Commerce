import React from 'react'
import {View, Button, StyleSheet } from 'react-native';

const HomeScreen = () =>{
    return(
        <View style={styles.container} >
            <Text style={styles.text}>Welcome</Text>
            <Button title="Logout" onPress={() => {}} />
        </View>
        
    );
}
export default HomeScreen

const styles= StyleSheet.create({
    container:{
        backgroundColor: 'yellow',
        flex: 1,
        justifyContent: 'center',
        alignItems : 'center',
        padding : 20
    },
    text:{
        fontSize:20,
        color:'#333333'
    }
})