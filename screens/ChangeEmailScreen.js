import React, { useContext, useState } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { View, Text, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-simple-toast'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { FloatingLabelInput } from 'react-native-floating-label-input'
import { Alert } from 'react-native';
import firebase from 'firebase';
import Firebase from '../firebaseConfig'

const ChangeEmailScreen = ({ navigation }) => {

    const { user } = useContext(AuthContext);
    const [email, setEmail] = useState('')
    const [currentPass, setCurrentPass] = useState('')
    const [newMail, setNewMail] = useState('')

    const reauthenticate = (pass) => {
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, pass);
        return user.reauthenticateWithCredential(cred);
    }

    const changeEmail = () => {
        if (email.length == 0 || currentPass.length == 0 || newMail.length == 0) {
            Toast.show("Feed the inputs first...", Toast.SHORT);
        } else if (user.email != email) {
            Alert.alert("Incorrect Email", "Provided email didn't match",
                [{ text: 'OK' }]);
        }
        else {
            reauthenticate(currentPass).then(() => {
                user.updateEmail(newMail).then(() => {
                    Firebase.database().ref(`Admin/${user.uid}`).update({email:newMail}).then(data => {
                        Toast.show("Email Updated", Toast.SHORT);
                        navigation.goBack();
                    })
                }).catch((error) => {
                    console.log(error);
                    alert(error)
                });
            }).catch((error) => {
                console.log(error);
                alert(error)
            });
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={{ flex: 1 }}>
                <StatusBar style="light" />
                <View style={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1, }}>

                    <Text style={{ marginTop: -100, marginBottom: 40, fontSize: 30, fontWeight: 'bold' }}>
                        Change Your Email </Text>

                    <View style={{ marginVertical: 10, width: '90%' }}>
                        <FloatingLabelInput
                            padding={10}
                            fontSize={18}
                            label={'Enter email'}
                            value={email}
                            keyboardType='email-address'
                            leftComponent={
                                <Entypo name='email' color={'purple'} size={20} />
                            }
                            onChangeText={(val) => setEmail(val)}
                        />
                    </View>

                    <View style={{ marginVertical: 10, width: '90%' }}>
                        <FloatingLabelInput
                            label={'Enter Current Password'}
                            padding={10}
                            fontSize={18}
                            value={currentPass}
                            blurOnSubmit={true}
                            leftComponent={
                                <Entypo name='lock' color={'purple'} size={20} />
                            }
                            onChangeText={(val) => setCurrentPass(val)} />
                    </View>

                    <View style={{ marginVertical: 10, width: '90%' }}>
                        <FloatingLabelInput
                            label={'Enter new Email'}
                            padding={10}
                            fontSize={18}
                            value={newMail}
                            leftComponent={
                                <MaterialCommunityIcons name='email-lock' color={'purple'} size={20} />
                            }
                            onChangeText={(val) => setNewMail(val)} />
                    </View>
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={() => { changeEmail(); Keyboard.dismiss(); }} >
                    <Text style={{ fontSize: 18, color: 'white' }}>Update Email</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>

    );

};

export default ChangeEmailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
    },
    saveButton: {
        padding: 15,
        elevation: 10,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        backgroundColor: 'black',
        alignItems: 'center',
    },
});
