import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../navigation/AuthProvider';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function SignUpScreen({ navigation }) {

    const { register } = useContext(AuthContext);

    const [data, setData] = useState({
        email: '',
        password: '',
    });

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={styles.main}>

                <LinearGradient
                    colors={['#20527e', '#f08080']}
                    style={styles.container}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}>

                    <View style={{ flexDirection: 'row' }}>
                        <FontAwesome style={{ marginTop: 10, paddingTop: 8, paddingLeft: 8 }} name="user-circle-o" size={24} color="red" />
                        <TextInput
                            style={styles.inputText}
                            placeholder={'Enter Email'}
                            placeholderTextColor='#dcdcdc'
                            autoCapitalize="none"
                            keyboardType="email-address"
							autoCorrect={false}
                            onChangeText={(entry) => setData({
                                ...data, email: entry
                            })} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialIcons style={{ marginTop: 10, paddingTop: 8, paddingLeft: 8 }} name="security" size={24} color="red" />
                        <TextInput
                            style={styles.inputText}
                            placeholder={'Enter Password'}
							autoCapitalize="none"
							autoCorrect={false}
                            placeholderTextColor='#dcdcdc'
                            onChangeText={(entry) => setData({
                                ...data, password: entry
                            })} />
                    </View>

                    <TouchableOpacity
                        style={styles.loginScreenButton}
                        //onPress={() => { register(data.email, data.password) }}
                        underlayColor='#fff'
                        onPress={() => { console.log(data.email, data.password) }}>
                        <Text style={styles.loginText}>SIGN UP</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.signinButton}
                        underlayColor='#fff'
                        onPress={() => { navigation.navigate('LoginScreen') }} >
                        <Text style={styles.signinText}>Already have a account?  LOG IN.</Text>

                    </TouchableOpacity>
                    <Text style={styles.text}>Sign up with your social account</Text>

                    <View style={{
                        flex: 0,
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}>
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

            </View>
        </TouchableWithoutFeedback>

    );

}

const styles = StyleSheet.create({
    main: {

        height: '100%',
        width: '100%'
        
    },
    container: {
        flex: 1,
        alignItems: "center",
        // justifyContent: "center",
        paddingTop: '50%'
    },

    inputText: {
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderColor: '#dcdcdc',
        padding: 8,
        margin: 10,
        width: "75%",
        //flex: 1,
		color: 'white',
		fontSize: 16,
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
        elevation: 20,
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
        flexDirection: 'row',
        marginRight: 40,
        marginLeft: 40,
        marginTop: 20,
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        backgroundColor: 'white',
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'white',
        width: 125,
    },
    socialText: {
        flex: 1,
		elevation: 10,
		color: 'gray',
		textAlign: 'center',
		fontWeight: 'bold',
		paddingRight: 10
    }
});