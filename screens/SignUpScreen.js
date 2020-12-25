import React, { useState } from 'react';
import {Dimensions} from 'react-native'; 
import { StyleSheet, Text, View, TextInput, Button,ScrollView,Keyboard, TouchableOpacity,TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';  
import { MaterialIcons } from '@expo/vector-icons'; 
export default function SignupScreen() {

    return (
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}}>
        <View style={styles.main}>
            
            <LinearGradient
                colors={['#20527e', '#f08080']}
                style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>
                <View style={{ flexDirection:'row'}}>
                <FontAwesome style={{marginTop: 10,paddingTop:8,paddingLeft:8}} name="user-circle-o" size={24} color="red" />
                <TextInput
                    style={styles.inputText}
                    placeholder={'Enter Email'}
                    placeholderTextColor='#dcdcdc' />
                </View>
                <View style={{ flexDirection:'row'}}>
                <MaterialIcons style={{marginTop: 10,paddingTop:8,paddingLeft:8}} name="security" size={24} color="red" />
                <TextInput
                    style={styles.inputText}
                    placeholder={'Enter Password'}
                    placeholderTextColor='#dcdcdc' />
                </View>

                <TouchableOpacity
                    style={styles.loginScreenButton}
                    //   onPress={() => navigate('HomeScreen')}
                    underlayColor='#fff'>
                    <Text style={styles.loginText}>SIGN UP</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.signinButton}
                    //   onPress={() => navigate('HomeScreen')}
                    underlayColor='#fff'>
                    <Text style={styles.signinText}>Already have a account? Log in.</Text>
                </TouchableOpacity>
                <Text style={styles.text}>Sign up with your social account</Text>
                <View style={{
                flex: 0,
                flexDirection: 'row',
               justifyContent: 'space-around'}}>
                <TouchableOpacity
                
                    style={styles.socialButton}
                    //   onPress={() => navigate('HomeScreen')}
                    underlayColor='#fff'>
                        <Entypo name="facebook" size={24} color="blue" />
                    <Text style={styles.socialText}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.socialButton}
                    //   onPress={() => navigate('HomeScreen')}
                    underlayColor='#fff'>
                        <AntDesign name="google" size={24} color="red" />
                    <Text style={styles.socialText}>Google</Text>
                </TouchableOpacity>
                </View>
            </LinearGradient>



            {/* <View>
                <TextInput
                style = {styles.inputText}
                placeholder='Enter Email'
                />
                </View> */}

        </View>
        </TouchableWithoutFeedback>




        

    );

}

const styles = StyleSheet.create({
    main: {
        
        height:'100%',
        width:'100%'
        // height:Dimensions.get('window').height ,
        // width:Dimensions.get('window').width
    },
    container: {
        flex: 1,
        alignItems: "center",
        // justifyContent: "center",
        paddingTop:'50%'
        

    },

    inputText: {
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderColor: '#dcdcdc',
        padding: 8,
        margin: 10,
        width: "75%",


    },
    button: {
        margin: 10,
        backgroundColor: 'red',
        width: 300,



    },
    loginScreenButton: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'red',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'red',
        width: '75%',
    },
    loginText: {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 10,
        fontWeight: 'bold',
        paddingRight: 10
    },
    signinButton: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'transparent',
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'white',
        width: '75%',
    },
    signinText: {
        color: 'white',
        textAlign: 'center',
        paddingLeft: 10,
        fontWeight: 'bold',
        paddingRight: 10
    },
    text: {
        marginTop: 50,
        color: 'white',
        fontWeight: 'bold'
    },
    socialButton: {
        flexDirection:'row',
        marginRight: 40,
        marginLeft: 40,
        marginTop: 20,
        paddingTop: 10,
        paddingLeft:10,
        paddingBottom: 10,
        backgroundColor: 'white',
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'white',
        width: 125,
    },
    socialText: {
        color: 'gray',
        textAlign: 'center',
        paddingLeft: 10,
        fontWeight: 'bold',
        paddingRight: 10
    }
});