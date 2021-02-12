import React, { useContext, useState } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { StatusBar } from 'expo-status-bar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Firebase from '../firebaseConfig'

const ProfileDisplayScreen = ({ navigation }) => {

    const { user } = useContext(AuthContext);
    const [listen, setListen] = useState(true);
    const [email, setEmail] = useState('email@example.com')
    const [first, setFirst] = useState('FirstName')
    const [last, setLast] = useState('LastName')
    const [mobile, setMobile] = useState('Mobile No.')
    const [city, setCity] = useState('City')

    Firebase.database().ref(`Admin/${user.uid}`).on('value', function (data) {
        if (listen) {
            if (data.val()) {
                if (data.val().email)
                    setEmail(data.val().email);
                if (data.val().firstName)
                    setFirst(data.val().firstName);
                if (data.val().lastName)
                    setLast(data.val().lastName);
                if (data.val().mobile)
                    setMobile(data.val().mobile);
                if (data.val().city)
                    setCity(data.val().city);
                setListen(false);
            }
        }
    })

    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image style={styles.avatar}
                        source={require('../assets/avatar.png')} />
                    <Text style={styles.name}>{first + " " + last} </Text>
                    <Text style={styles.userInfo}>{email}</Text>
                    <Text style={styles.userInfo}>{mobile}</Text>
                    <Text style={styles.userInfo}>{city} </Text>
                </View>
            </View>

            <View style={styles.body}>
                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Edit Profile')}>
                    <FontAwesome5 name='user-edit' size={22} style={{ margin: 15 }} />
                    <View style={styles.infoContent}>
                        <Text style={styles.info}>Edit Profile</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Change Email')}>
                    <MaterialCommunityIcons name='email-edit' size={22} style={{ margin: 15 }} />
                    <View style={styles.infoContent}>
                        <Text style={styles.info}>Change Email</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Change Password')}>
                    <MaterialCommunityIcons name='shield-edit' size={22} style={{ margin: 15 }} />
                    <View style={styles.infoContent}>
                        <Text style={styles.info}>Change Password</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    );
}

export default ProfileDisplayScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: "#DCDCDC",
    },
    headerContent: {
        margin: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
    },
    name: {
        marginTop: 10,
        fontSize: 22,
        color: "#000000",
        fontWeight: '600',
    },
    userInfo: {
        fontSize: 18,
        color: "#778899",
        fontWeight: '600',
    },
    body: {
        backgroundColor: "#778899",
        paddingTop: 30,
        flex: 1,
        alignItems: 'center',
    },
    item: {
        flexDirection: 'row',
        borderBottomLeftRadius:50,
        borderTopRightRadius:50,
        borderRadius: 20,
        borderWidth: 2,
        elevation:5,
        shadowColor:'black',
        borderColor: '#DCDCDC',
        width: '80%',
        marginVertical: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    infoContent: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    info: {
        position: 'absolute',
        fontSize: 18,
        color: "#FFFFFF",
        justifyContent: 'center',
    }
});