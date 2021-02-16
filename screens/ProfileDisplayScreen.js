import React, { useContext, useState } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { StatusBar } from 'expo-status-bar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Firebase from '../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-simple-toast';
import dummyImage from "../assets/avatar.png";

const ProfileDisplayScreen = ({ navigation }) => {

    const { user } = useContext(AuthContext);
    const [listen, setListen] = useState(true);
    const [email, setEmail] = useState('email@example.com')
    const [first, setFirst] = useState('FirstName')
    const [last, setLast] = useState('LastName')
    const [mobile, setMobile] = useState('Mobile No.')
    const [city, setCity] = useState('City');
    const [accNo, setAccNO] = useState('0')
    const [ifsc, setIfsc] = useState('0');
    var profileImage = Image.resolveAssetSource(dummyImage).uri;
    

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
                if (data.val().AccountNumber)
                    setAccNO(data.val().AccountNumber);
                if (data.val().IfscCode)
                    setIfsc(data.val().IfscCode);
                if (data.val().profileImage)
                    profileImage = data.val().profileImage;

                    console.log("fbhjbd",profileImage);
            }
            setListen(false);
        }
    })

    const AddImageHandler = async () => {

        console.log("clivked");
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }
        let URI = pickerResult.uri;
        const imageName = URI.substring(URI.lastIndexOf('/') + 1);
        const response = await fetch(URI);
        const blob = await response.blob();
        Firebase.storage()
            .ref(`${imageName}`)
            .put(blob)
            .then((snapshot) => {
                snapshot.ref.getDownloadURL().then((url) => {
                    profileImage=url;
                    console.log("image set",profileImage);
                    Firebase.database().ref(`/Admin/${user.uid}`).update({
                        profileImage:profileImage
                    }, Toast.show("Successfully Updated", Toast.SHORT))
                    
                });
            })
            .catch((e) => console.log('uploading image error => ', e));
    };

    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <View style={styles.header}>
                <View style={styles.headerContent}>
                <TouchableOpacity onPress={()=>AddImageHandler()}>
                    <Image style={styles.avatar}
                        source={{ uri: profileImage } }  />
                        </TouchableOpacity>
                    <Text style={styles.name}>{first + " " + last} </Text>
                    <Text style={styles.userInfo}>{email}</Text>
                    <Text style={styles.userInfo}>{mobile}</Text>
                    <Text style={styles.userInfo}>{city} </Text>
                    <Text style={styles.userInfo}>{accNo} </Text>
                    <Text style={styles.userInfo}>{ifsc} </Text>
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
        borderBottomLeftRadius: 50,
        borderTopRightRadius: 50,
        borderRadius: 20,
        borderWidth: 2,
        elevation: 5,
        shadowColor: 'black',
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