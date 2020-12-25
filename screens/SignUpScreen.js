import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../navigation/AuthProvider';

export default function SignUpScreen({navigation}) {

    const {register} = useContext(AuthContext);

    const [data, setData] = useState({
		email: '',
		password: '',
	});

    return (

        <View style={styles.main}>
            <LinearGradient
                colors={['#20527e', '#f08080']}
                style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>

                <TextInput
                    style={styles.inputText}
                    placeholder={'Enter Email'}
                    placeholderTextColor='#dcdcdc' 
                    placeholderTextColor='grey'
				    onChangeText={(entry) => setData({
						...data, email:entry
					})}/>

                <TextInput
                    style={styles.inputText}
                    placeholder={'Enter Password'}
                    placeholderTextColor='#dcdcdc'
                    onChangeText={(entry) => setData({
                        ...data, password: entry
                    })} />

                <TouchableOpacity
                    style={styles.loginScreenButton}
                    //onPress={() => register()}
                    underlayColor='#fff'
                    onPress={() => {console.log(data.email,data.password)}}>

                    <Text style={styles.loginText}>SIGN UP</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.signinButton}
                    underlayColor='#fff'
                    onPress={() => {navigation.navigate('LoginScreen')}} >
                    <Text style={styles.signinText}>Already have a account?  LOG IN.</Text>

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
                    <Text style={styles.socialText}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.socialButton}
                    //   onPress={() => navigate('HomeScreen')}
                    underlayColor='#fff'>
                    <Text style={styles.socialText}>Google</Text>
                </TouchableOpacity>
                </View>
            </LinearGradient>

        </View>
    );

}

const styles = StyleSheet.create({
    main: {
        height: '100%',
        width: '100%'
    },
    container: {
        paddingTop:'40%',
        flex: 1,
        alignItems: "center",
        //justifyContent: "center"

    },

    inputText: {
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderColor: '#dcdcdc',
        padding: 8,
        margin: 10,
        width: 300,


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
        width: 300,
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
        width: 300,
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
        marginRight: 40,
        marginLeft: 40,
        marginTop: 20,
        paddingTop: 10,
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